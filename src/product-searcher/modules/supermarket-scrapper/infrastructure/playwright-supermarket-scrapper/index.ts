import { chromium } from 'playwright';
import type { ElementHandle, Locator, Page } from 'playwright';

import { Logger } from '../../../../shared/domain/logger';
import { NotFoundProductException } from '../errors';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';
import { ProductSelectors, SupermarketData } from '../../../supermarket-data/domain/supermarket-data';

export class PlaywrightSupermarketScrapper implements SupermarketScrapper {
  async getDataProducts ( toSearch: string, supermarket: SupermarketData, logger: Logger ) {
    const browser = await chromium.launch( { headless: true } );
    const context = await browser.newContext();
    const page = await context.newPage();

    logger.log( `Opening ${ supermarket.urlToGo } and searching ${ toSearch }...` );
    await page.goto( `${ supermarket.urlToSearch }=${ toSearch }`, { timeout: 60000 } );

    logger.log( `${ supermarket.name } - Scanning results for ${ toSearch }...` );
    await this._ensureProductsFound( page, supermarket, toSearch );

    logger.log( `${ supermarket.name } - Scrolling to bottom the end page...` );
    await this._scrollBottomAndRenderImages( page, supermarket.productSelector );

    logger.log( `${ supermarket.name } - Getting products...` );
    const productsLocator = page.locator( supermarket.productsSelector );

    logger.log( `${ supermarket.name } - Get information of each product` );
    const rawProducts = await this._getProductsData( productsLocator, supermarket.productSelector );

    logger.log( `${ supermarket.name } - Closing browser...` );
    await browser.close();

    logger.log( `${ supermarket.name } - Returning products...` );

    return rawProducts;
  }

  async getDataBanners ( supermarkets: SupermarketData[], logger: Logger ): Promise<any[]> {
    const browser = await chromium.launch( { headless: false } );
    const context = await browser.newContext();

    const imgss = supermarkets.map( async supermarket => {
      const page = await context.newPage();

      logger.log( `Opening ${ supermarket.urlToGo }...` );
      await page.goto( `${ supermarket.urlToGo }`, { timeout: 60000 } );

      logger.log( `${ supermarket.name } - Waiting for the banner image to load...` );
      await page.waitForLoadState( 'load' );

      return page.locator( supermarket.bannerSelector ).evaluate( $banner => {
        const $bannerImgs = $banner.getElementsByTagName( 'img' );
        const imgs = Array.from( $bannerImgs ).map( $bannerImg => $bannerImg.src );

        return imgs;
      } );
    } );
    const x = Promise.all( imgss );
    return x;
  }

  private _getUrlsFromLocatorElement = async ( locator: Locator, attribute: string ) => {
    const elements = await locator.elementHandles();
    const promiseUrls = elements.map( ( element: ElementHandle ) => element.getAttribute( attribute ) );

    return Promise.all( promiseUrls );
  };

  private _scrollBottomAndRenderImages = async ( page: Page, productSelectors: ProductSelectors ) => {
    const IMAGES_TO_RENDER = 40;

    page.evaluate( async () => {
      for ( let i = 0; i < document.body.scrollHeight; i += 0.05 ) {
        window.scrollTo( 0, i );
      }

      return Promise.resolve();
    } );

    await page.waitForFunction( predicate => {
      return document.querySelectorAll( predicate.imgSelector ).length >= predicate.imgToRender;
    }, { imgSelector: productSelectors.image, imgToRender: IMAGES_TO_RENDER } );
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

  private async _getProductsData ( productsLocator: Locator, productSelectors: ProductSelectors ): Promise<any[]> {
    const { bestPrice, description, image, name, normalPrice, origin, unit, url } = productSelectors;

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
