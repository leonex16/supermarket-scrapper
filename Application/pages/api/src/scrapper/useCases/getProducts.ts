import { chromium } from 'playwright';

import { Product } from '@server/scrapper/entities/Product';
import { SUPERMARKET_SELECTORS } from '@server/constants/index';
import { Supermarkets } from '@server/types/index';
import { logger } from '@server/functions/index';
import { ProductNameValueNotValidException, SupermarketValueNotValidException } from '@server/scrapper/errors/index';
import { getProductsData, scrollBottom, toSearch } from '@server/scrapper/functions/index';

export const getProducts = async( productName: string, supermarket: Supermarkets ): Promise<{ products: Product[]}> => {
  if ( productName.trim() === '' ) throw new ProductNameValueNotValidException();
  if ( SUPERMARKET_SELECTORS[ supermarket.toUpperCase() ] === undefined ) throw new SupermarketValueNotValidException();

  const SUPERMARKET = SUPERMARKET_SELECTORS[ supermarket.toUpperCase() ];
  const browser = await chromium.launch( { headless: true, slowMo: 100 } );
  const context = await browser.newContext();
  const page = await context.newPage();

  logger( 'info', `Opening ${ SUPERMARKET.URL }` );
  await page.goto( SUPERMARKET.URL, { timeout: 60000 });

  logger( 'info', `${ supermarket } - Searching for ${ productName }` );
  await toSearch( page, SUPERMARKET, productName );

  logger( 'info', `${ supermarket } - Scrolling to bottom the end page...` );
  await scrollBottom( page );

  logger( 'info', `${ supermarket } - Getting products...` );
  const productsLocator = page.locator( SUPERMARKET.PRODUCTS );

  logger( 'info', `${ supermarket } - Get information of each product` );
  const rawProducts = await getProductsData( productsLocator, SUPERMARKET.PRODUCT );

  logger( 'info', `${ supermarket } - Closing browser...` );
  await browser.close();

  const products = ( rawProducts.map( prod => Product.create( prod ) ).filter( Boolean ) as Product[] );

  return { products };
};
