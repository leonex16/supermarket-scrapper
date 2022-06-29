import { expect, test } from '@playwright/test';

import { LoggerConsole } from '../../../../../shared/infrastructure/logger-console-logger';
import { NotFoundProductException } from '../../../../../modules/supermarket/infrastructure/errors';
import { ProductExtractor } from '../../../../../modules/supermarket/application/extract/product-extractor';
import { SupermarketScrapperPlaywright } from '../../../../../modules/supermarket/infrastructure/supermarket-scrapper-playwright';

test.describe( 'SupermarketScrapperPlaywright', () => {
  const loggerConsole = new LoggerConsole();
  const supermarketScrapperPlaywright = new SupermarketScrapperPlaywright();

  test.describe( 'ProductExtractor', () => {
    const productExtractor = new ProductExtractor( supermarketScrapperPlaywright );

    test.describe( 'HappyPath', () => {
      test( 'should return an array of jumbo\'s products', async () => {
        const productToSearch = 'Bebida';
        const productsJumbo = await productExtractor.run( productToSearch, 'JUMBO', loggerConsole );

        expect( productsJumbo.length ).toBeGreaterThanOrEqual( 1 );
      } );

      test( 'should return an array of lider\'s products', async () => {
        const productToSearch = 'Bebida';
        const productsLider = await productExtractor.run( productToSearch, 'LIDER', loggerConsole );

        expect( productsLider.length ).toBeGreaterThanOrEqual( 1 );
      } );
    } );

    test.describe( 'BadPath', () => {
      test.describe( 'JUMBO supermarket', () => {
        // TODO:Where do the validations/excepctions; Route - Use Case - Implementation
        // test( 'should throws an error, when product name will not be empty string', async () => {
        //   await expect( productExtractor.run( '', 'JUMBO', loggerConsole ) ).rejects.toThrowError( 'Product name can not to be empty' );
        // } );

        test( 'should return an error, supermarket value will be a valid supermarket', async () => {
          const SUPPERMARKET_NOT_SUPPORTED = 'SUPPERMARKET_NOT_SUPPORTED' as any;

          await expect( productExtractor.run( 'bebida', SUPPERMARKET_NOT_SUPPORTED, loggerConsole ) )
            .rejects.toThrowError( `${ SUPPERMARKET_NOT_SUPPORTED } supermarket does not support yet` );
        } );

        test( 'should throws an error when product not found', async () => {
          const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND' as any;

          await expect( productExtractor.run( PRODUCT_NOT_FOUND, 'JUMBO', loggerConsole ) )
            .rejects.toThrowError( new NotFoundProductException( PRODUCT_NOT_FOUND ) );
        } );
      } );

      test.describe( 'LIDER supermarket', () => {
        // TODO:Where do the validations/excepctions; Route - Use Case - Implementation
        // test( 'should throws an error, when product name will not be empty string', async () => {
        //   await expect( productExtractor.run( '', 'LIDER', loggerConsole ) ).rejects.toThrowError( 'Product name can not to be empty' );
        // } );

        test( 'should return an error, supermarket value will be a valid supermarket', async () => {
          const SUPPERMARKET_NOT_SUPPORTED = 'SUPPERMARKET_NOT_SUPPORTED' as any;

          await expect( productExtractor.run( 'bebida', SUPPERMARKET_NOT_SUPPORTED, loggerConsole ) )
            .rejects.toThrowError( `${ SUPPERMARKET_NOT_SUPPORTED } supermarket does not support yet` );
        } );

        test( 'should throws an error when product not found', async () => {
          const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND' as any;

          await expect( productExtractor.run( PRODUCT_NOT_FOUND, 'LIDER', loggerConsole ) )
            .rejects.toThrowError( new NotFoundProductException( PRODUCT_NOT_FOUND ) );
        } );
      } );
    } );
  } );
} );
