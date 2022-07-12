import { chromium } from 'playwright';
import type { ElementHandle, Locator, Page } from 'playwright';

import { Logger } from '../../../../shared/domain/logger';
import { NotFoundProductException } from '../errors';
import { Supermarket } from '../../domain/supermarket';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';
import { ProductSelectors, SupermarketSelectors } from '../../shared/interfaces';

export class SupermarketScrapperPlaywright implements SupermarketScrapper {
  async getDataProducts ( toSearch: string, supermarket: Supermarket, logger: Logger ) {
    const SUPERMARKET_SELECTORS = supermarket.getSelectors();
    const browser = await chromium.launch( { headless: true, slowMo: 100 } );
    const context = await browser.newContext();
    const page = await context.newPage();

    logger.log( `Opening ${ SUPERMARKET_SELECTORS.URL } and searching ${ toSearch }...` );
    await page.goto( `${ SUPERMARKET_SELECTORS.URL_TO_SEARCH }=${ toSearch }`, { timeout: 60000 } );

    logger.log( `${ SUPERMARKET_SELECTORS.NAME } - Scrolling to bottom the end page...` );
    await this._scrollBottom( page );

    logger.log( `${ SUPERMARKET_SELECTORS.NAME } - Getting products...` );
    const productsLocator = page.locator( SUPERMARKET_SELECTORS.PRODUCTS );

    logger.log( `${ SUPERMARKET_SELECTORS.NAME } - Get information of each product` );
    const rawProducts = await this._getProductsData( productsLocator, SUPERMARKET_SELECTORS.PRODUCT );

    logger.log( `${ SUPERMARKET_SELECTORS.NAME } - Closing browser...` );
    await browser.close();

    logger.log( `${ SUPERMARKET_SELECTORS.NAME } - Returning products...` );

    return rawProducts;
  }

  async getBanner ( _supermarket: Supermarket ): Promise<any[]> {
    return [];
  }

  private _getUrlsFromLocatorElement = async ( locator: Locator, attribute: string ) => {
    const elements = await locator.elementHandles();
    const promiseUrls = elements.map( ( element: ElementHandle ) => element.getAttribute( attribute ) );

    return Promise.all( promiseUrls );
  };

  private _scrollBottom = async ( page: Page ) => {
    page.evaluate( () => {
      for ( let i = 0; i < document.body.scrollHeight; i += 50 ) {
        window.scrollTo( 0, i );
      }
      return Promise.resolve();
    } );
    await new Promise( resolve => { setTimeout( resolve, 5000 ); } );
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
    const { DESCRIPTION, DETAIL, IMAGE, NAME, URL } = PRODUCT_SELECTORS;

    const promises = [
      productsLocator.locator( NAME ).allInnerTexts(),
      productsLocator.locator( DESCRIPTION ).allInnerTexts(),
      productsLocator.locator( DETAIL.NORMAL_PRICE ).allInnerTexts(),
      productsLocator.locator( DETAIL.BEST_PRICE ).allInnerTexts(),
      productsLocator.locator( DETAIL.UNIT ).allInnerTexts(),
      this._getUrlsFromLocatorElement( productsLocator.locator( IMAGE ), 'src' ),
      this._getUrlsFromLocatorElement( productsLocator.locator( URL ), 'href' )
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
      source: `${ PRODUCT_SELECTORS.ORIGIN }${ raw[ 6 ] }`
    } ) );

    return products;
  }

  private async _toSearch ( page: Page, SUPERMARKET: SupermarketSelectors, productName: string ): Promise<void> {
    const locatorNotFound = page.locator( SUPERMARKET.NOT_FOUND ).first();
    const locatorProduct = page.locator( SUPERMARKET.PRODUCTS ).first();
    const $searchBox = page.locator( SUPERMARKET.SEARCH_BOX );

    await $searchBox.waitFor();
    await $searchBox.fill( productName );
    await $searchBox.press( 'Enter' );

    const className = await Promise.race( [
      locatorNotFound.getAttribute( 'class', { timeout: 120000 } ),
      locatorProduct.getAttribute( 'class', { timeout: 120000 } )
    ] );

    if ( `.${ className }` === SUPERMARKET.NOT_FOUND ) throw new NotFoundProductException( productName );
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
