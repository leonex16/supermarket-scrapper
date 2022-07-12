import { chromium } from 'playwright';
import type { ElementHandle, Locator, Page } from 'playwright';

import { Logger } from '../../../../shared/domain/logger';
import { NotFoundProductException } from '../errors';
import { SupermarketData } from '../../../supermarket-data/domain/supermarket-data';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';
import { ProductSelectors, SupermarketSelectors } from '../../shared/interfaces';

export class PlaywrightSupermarketScrapper implements SupermarketScrapper {
  async getDataProducts ( toSearch: string, supermarket: SupermarketData, logger: Logger ) {
    const browser = await chromium.launch( { headless: true, slowMo: 100 } );
    const context = await browser.newContext();
    const page = await context.newPage();

    logger.log( `Opening ${ supermarket.urlToGo } and searching ${ toSearch }...` );
    await page.goto( `${ supermarket.urlToSearch }=${ toSearch }`, { timeout: 60000 } );

    logger.log( `Scanning results for ${ toSearch }...` );
    await this._ensureProductsFound( page, supermarket, toSearch );

    logger.log( `${ supermarket.name } - Scrolling to bottom the end page...` );
    await this._scrollBottom( page );

    logger.log( `${ supermarket.name } - Getting products...` );
    const productsLocator = page.locator( supermarket.productsSelector );

    logger.log( `${ supermarket.name } - Get information of each product` );
    const rawProducts = await this._getProductsData( productsLocator, supermarket.productSelector );

    logger.log( `${ supermarket.name } - Closing browser...` );
    await browser.close();

    logger.log( `${ supermarket.name } - Returning products...` );

    return rawProducts;
  }

  async getDataBanner ( _supermarket: SupermarketData ): Promise<any[]> {
    return [];
  }

  private _getUrlsFromLocatorElement = async ( locator: Locator, attribute: string ) => {
    const elements = await locator.elementHandles();
    const promiseUrls = elements.map( ( element: ElementHandle ) => element.getAttribute( attribute ) );

    return Promise.all( promiseUrls );
  };

  private _scrollBottom = async ( page: Page ) => {
    await page.evaluate( async () => {
      for ( let i = 0; i < document.body.scrollHeight; i += 0.01 ) {
        window.scrollTo( 0, i );
      }

      return Promise.resolve();
    } );
    await page.waitForLoadState( 'networkidle' );
  };

  private async _getBannerData ( bannerLocator: Locator ): Promise<any> {
    const $bannerImgs = this._getUrlsFromLocatorElement( bannerLocator.locator( 'img' ), 'src' );
    const $bannerAlts = this._getUrlsFromLocatorElement( bannerLocator.locator( 'img' ), 'alt' );
    const [ images, imageAlts ] = await Promise.all( [ $bannerImgs, $bannerAlts ] );

    return images.map( ( image, index ) => ( {
      image,
      alt: imageAlts[ index ] ?? 'Sin descripción'
    } ) );
  }

  private async _getProductsData ( productsLocator: Locator, PRODUCT_SELECTORS: ProductSelectors ): Promise<any[]> {
    const { bestPrice, description, image, name, normalPrice, origin, unit, url } = PRODUCT_SELECTORS;

    const promises = [
      productsLocator.locator( name ).allInnerTexts(),
      productsLocator.locator( description ).allInnerTexts(),
      productsLocator.locator( normalPrice ).allInnerTexts(),
      productsLocator.locator( bestPrice ).allInnerTexts(),
      productsLocator.locator( unit ).allInnerTexts(),
      this._getUrlsFromLocatorElement( productsLocator.locator( image ), 'src' ),
      this._getUrlsFromLocatorElement( productsLocator.locator( url ), 'href' )
    ];

    const responses = await Promise.all( promises );
    const zippedResponse = this.zip( ...responses );

    const products = zippedResponse.map( ( raw: any ) => ( {
      name: raw[ 0 ],
      description: raw[ 1 ],
      normalPrice: raw[ 2 ],
      bestPrice: raw[ 3 ],
      unit: raw[ 4 ],
      image: raw[ 5 ],
      source: `${ origin }${ raw[ 6 ] }`
    } ) );

    return products;
  }

  private async _toSearch ( page: Page, SUPERMARKET: SupermarketSelectors, productName: string ): Promise<void> {
    const $searchBox = page.locator( SUPERMARKET.SEARCH_BOX );

    await $searchBox.waitFor();
    await $searchBox.fill( productName );
    await $searchBox.press( 'Enter' );
  }

  private async _ensureProductsFound ( page: Page, supermarket: SupermarketData, productName: string ) {
    const isVisibleLayoutNotFound = await page.locator( supermarket.notFoundProductSelector ).isVisible();

    if ( isVisibleLayoutNotFound ) throw new NotFoundProductException( productName );
  }

  private zip ( ...args: any ) {
    const arrLen = args.map( ( arr: any ) => arr.length );
    const maxItems = Math.max( ...arrLen );
    const returnValue = new Array( maxItems ).fill( undefined );

    for ( let i = 0; i < maxItems; i++ ) {
      returnValue[ i ] = args.map( ( arg: any ) => arg[ i ] );
    }

    return returnValue;
  }
}
