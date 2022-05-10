import { ElementHandle, Locator, Page } from 'playwright';

import { NotFoundProductException } from '#src/scrapper/errors/index';
import { Product as IProduct, RawProduct, Supermarket } from '#src/interfaces/index';

const getUrlsFromLocatorElement = async( locator: Locator, attribute: string ) => {
  const elements = await locator.elementHandles();
  const promiseUrls = elements.map( ( element: ElementHandle ) => element.getAttribute( attribute ) );

  return Promise.all( promiseUrls );
};

export const scrollBottom = async( page: Page ) => {
  page.evaluate( () => {
    for ( let i = 0; i < document.body.scrollHeight; i += 50 ) {
      window.scrollTo( 0, i );
    }
    return Promise.resolve();
  } );
  await new Promise( resolve => { setTimeout( resolve, 2000 ); } );
};

export async function getProductsData( productsLocator: Locator, PRODUCT: IProduct ): Promise<RawProduct[]> {
  const promises = [
    productsLocator.locator( PRODUCT.NAME ).allInnerTexts(),
    productsLocator.locator( PRODUCT.DESCRIPTION ).allInnerTexts(),
    productsLocator.locator( PRODUCT.DETAIL.NORMAL_PRICE ).allInnerTexts(),
    productsLocator.locator( PRODUCT.DETAIL.BEST_PRICE ).allInnerTexts(),
    productsLocator.locator( PRODUCT.DETAIL.UNIT ).allInnerTexts(),
    getUrlsFromLocatorElement( productsLocator.locator( PRODUCT.IMAGE ), 'src' ),
    getUrlsFromLocatorElement( productsLocator.locator( PRODUCT.URL ), 'href' ),
  ];

  const requests = await Promise.all( promises );

  const products: RawProduct[] = requests[ 0 ].map( ( name, index ) => ( {
    name: name ?? undefined,
    description: requests[ 1 ]?.at( index ) ?? undefined,
    detail: {
      normalPrice: requests[ 2 ]?.at( index ) ?? undefined,
      bestPrice: requests[ 3 ]?.at( index ) ?? undefined,
      unit: requests[ 4 ]?.at( index ) ?? undefined,
    },
    image: requests[ 5 ]?.at( index ) ?? undefined,
    url: requests[ 6 ]?.at( index ) ?? undefined,
  } ) );

  return products;
}

export async function toSearch( page: Page, SUPERMARKET: Supermarket, productName: string ): Promise<void> {
  const locatorNotFound = page.locator( SUPERMARKET.NOT_FOUND ).first();
  const locatorProduct = page.locator( SUPERMARKET.PRODUCTS ).first();
  const $searchBox = page.locator( SUPERMARKET.SEARCH_BOX );
  await $searchBox.waitFor();
  await $searchBox.fill( productName );
  await $searchBox.press( 'Enter' );
  const className = await Promise.race( [
    locatorNotFound.getAttribute( 'class', { timeout: 50000 } ),
    locatorProduct.getAttribute( 'class', { timeout: 50000 } ),
  ] );

  if ( `.${ className }` === SUPERMARKET.NOT_FOUND ) throw new NotFoundProductException();
}
