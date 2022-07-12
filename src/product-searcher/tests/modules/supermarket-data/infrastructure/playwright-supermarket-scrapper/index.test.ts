import { expect, test } from '@playwright/test';

import { LoggerConsole } from '../../../../../shared/infrastructure/logger-console-logger';

import { JumboSupermarketData } from '../../../../../modules/supermarket-data/infrastructure/jumbo-supermarket-data';
import { LiderSupermarketData } from '../../../../../modules/supermarket-data/infrastructure/lider-supermarket-data';
import { SupermarketFinder } from '../../../../../modules/supermarket-data/application/supermarket-finder';

import { NotFoundProductException } from '../../../../../modules/supermarket-scrapper/infrastructure/errors';
import { PlaywrightSupermarketScrapper } from '../../../../../modules/supermarket-scrapper/infrastructure/playwright-supermarket-scrapper';
import { ProductExtractor } from '../../../../../modules/supermarket-scrapper/application/product-extractor';

const supermarketFinder = new SupermarketFinder( [
  new JumboSupermarketData(),
  new LiderSupermarketData()
] );

test.describe( 'SupermarketScrapperPlaywright', () => {
  const loggerConsole = new LoggerConsole();
  const supermarketScrapperPlaywright = new PlaywrightSupermarketScrapper();

  test.describe( 'ProductExtractor', () => {
    const productExtractor = new ProductExtractor( supermarketScrapperPlaywright );

    test.describe( 'HappyPath', () => {
      test.only( 'should return an array of jumbo\'s products', async () => {
        const productToSearch = 'Bebida';
        const productsJumbo = await productExtractor.run( productToSearch, supermarketFinder.run( 'JUMBO' ), loggerConsole );

        expect( productsJumbo.length ).toBeGreaterThanOrEqual( 1 );
      } );

      test( 'should return an array of lider\'s products', async () => {
        const productToSearch = 'Bebida';
        const productsLider = await productExtractor.run( productToSearch, supermarketFinder.run( 'LIDER' ), loggerConsole );

        expect( productsLider.length ).toBeGreaterThanOrEqual( 1 );
      } );
    } );

    test.describe( 'BadPath', () => {
      test.describe( 'JUMBO supermarket', () => {
        // TODO:Where do the validations/excepctions; Route - Use Case - Implementation
        // Route/Controller => Handle the exceptions
        // test( 'should throws an error, when product name will not be empty string', async () => {
        //   await expect( productExtractor.run( '', 'JUMBO', loggerConsole ) ).rejects.toThrowError( 'Product name can not to be empty' );
        // } );

        test( 'should throws an error when product not found', async () => {
          const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND' as any;

          await expect( productExtractor.run( PRODUCT_NOT_FOUND, supermarketFinder.run( 'JUMBO' ), loggerConsole ) )
            .rejects.toThrowError( new NotFoundProductException( PRODUCT_NOT_FOUND ) );
        } );
      } );

      test.describe( 'LIDER supermarket', () => {
        // TODO:Where do the validations/excepctions; Route - Use Case - Implementation
        // test( 'should throws an error, when product name will not be empty string', async () => {
        //   await expect( productExtractor.run( '', 'LIDER', loggerConsole ) ).rejects.toThrowError( 'Product name can not to be empty' );
        // } );

        test( 'should throws an error when product not found', async () => {
          const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND' as any;

          await expect( productExtractor.run( PRODUCT_NOT_FOUND, supermarketFinder.run( 'LIDER' ), loggerConsole ) )
            .rejects.toThrowError( new NotFoundProductException( PRODUCT_NOT_FOUND ) );
        } );
      } );
    } );
  } );
} );
