import { expect, test } from '@playwright/test';

import { Product } from '../../../../modules/product/domain/product';
import { EmptyValueException, StrTooLargeException, StrTooShortException, UrlNotValidException } from '../../../../modules/product/domain/errors';

let productParams: any = {};

test.beforeEach( () => {
  productParams = {
    id: '1',
    name: 'product-name',
    description: 'product-description',
    normalPrice: '1000',
    bestPrice: '800',
    unit: 'unit',
    image: 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
    source: 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url'
  };
} );

test.describe( 'Product', () => {
  test.describe( 'HappyPath', () => {
    test( 'can create an instance', () => {
      const product = Product.create( productParams );

      expect( product ).toBeInstanceOf( Product );
    } );

    test( 'get data formatted respoct to original params', () => {
      const product = Product.create( productParams );
      const formatCLPCurrencyRegex = /^\$\d+(\.\d{3})*$/gm;

      // expect( product.id ).toBe( productParams.id );
      expect( product.name ).toMatch( new RegExp( productParams.name, 'gi' ) );
      expect( product.description ).toBe( productParams.description );
      expect( product.detail.normalPrice ).toMatch( formatCLPCurrencyRegex );
      expect( product.detail.bestPrice ).toMatch( formatCLPCurrencyRegex );
      expect( product.detail.unit ).toBe( productParams.unit );
      expect( product.image ).toBe( productParams.image );
      expect( product.source ).toBe( productParams.source );
    } );

    test( 'allow create an instance, missing description and its value got, must be null', () => {
      delete productParams.description;
      const product = Product.create( productParams );

      expect( product ).toBeInstanceOf( Product );
      expect( product.description ).toBeNull();
    } );

    test( 'allow create an instance, missing normalPrice and the value got, must be null', () => {
      delete productParams.normalPrice;
      const product = Product.create( productParams );

      expect( product ).toBeInstanceOf( Product );
      expect( product.detail.normalPrice ).toBeNull();
    } );

    test( 'allow create an instance, missing bestPrice and the value got, must be null', () => {
      delete productParams.bestPrice;
      const product = Product.create( productParams );

      expect( product ).toBeInstanceOf( Product );
      expect( product.detail.bestPrice ).toBeNull();
    } );

    test( 'allow create an instance, missing image and the value got, must be url by default', () => {
      delete productParams.image;
      const product = Product.create( productParams );

      expect( product ).toBeInstanceOf( Product );
      expect( product.image ).toBeTruthy();
    } );
  } );

  test.describe( 'BadPath', () => {
    test( 'throws an error when the name to be undefined', () => {
      delete productParams.name;
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'name' ) );
    } );

    test( 'throws an error when the unit to be undefined', () => {
      delete productParams.unit;
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'unit' ) );
    } );

    test( 'throws an error when the source to be undefined', () => {
      delete productParams.source;
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'source' ) );
    } );

    test( 'throws an error when the name to be empty', () => {
      productParams.name = '';
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'name' ) );
    } );

    test( 'throws an error when the unit to be empty', () => {
      productParams.unit = '';
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'unit' ) );
    } );

    test( 'throws an error when the source to be empty', () => {
      productParams.source = '';
      expect( () => Product.create( productParams ) )
        .toThrowError( new EmptyValueException( 'source' ) );
    } );

    test( 'throws an error when the name has a length less than 2', () => {
      const testValue = 'a'.repeat( 2 - 1 );
      productParams.name = testValue;
      expect( () => Product.create( productParams ) )
        .toThrowError( new StrTooShortException( 'name' ) );
    } );

    test( 'throws an error when the name has a length greater than 50', () => {
      const testValue = 'a'.repeat( 50 + 1 );
      productParams.name = testValue;
      expect( () => Product.create( productParams ) )
        .toThrowError( new StrTooLargeException( 'name' ) );
    } );

    test( 'throws an error when the description has a length greater than 50', () => {
      const testValue = 'a'.repeat( 50 + 1 );
      productParams.description = testValue;
      expect( () => Product.create( productParams ) )
        .toThrowError( new StrTooLargeException( 'description' ) );
    } );

    test( 'throws an error when the image has a value no valid', () => {
      productParams.image = 'invalid-url';
      expect( () => Product.create( productParams ) )
        .toThrowError( new UrlNotValidException( 'image' ) );
    } );

    test( 'throws an error when the source has a value no valid', () => {
      productParams.source = 'invalid-url';
      expect( () => Product.create( productParams ) )
        .toThrowError( new UrlNotValidException( 'source' ) );
    } );
  } );

  // MEMO: Is needs testing private methods?
  // test.describe( 'Internal Methods', () => {
  //   test.describe( 'formatToCLPCurrency', () => {
  //     it( 'should return zero if the argument is not defined plus $ symbol', () => {
  //       expect( fns.formatToCLPCurrency() ).toBe( '$0' );
  //     } );
  //     it( 'should return zero if the argument is not a number plus $ symbol', () => {
  //       expect( fns.formatToCLPCurrency( 'string' ) ).toBe( '$0' );
  //     } );
  //     it( 'should return the argument formatted with $ symbol', () => {
  //       expect( fns.formatToCLPCurrency( 100 ) ).toBe( '$100' );
  //       expect( fns.formatToCLPCurrency( '100' ) ).toBe( '$100' );
  //     } );
  //   } );

  //   test.describe( 'removeQueryString', () => {
  //     it( 'should return an empty string if the value does not match with split argument ', () => {
  //       expect( fns.removeQueryString( '' ) )
  //         .toBe( '' );
  //     } );
  //     it( 'should returns the url without query string', () => {
  //       expect( fns.removeQueryString( 'https://google.us.edi?34535/534534?dfg=g&f' ) )
  //         .toBe( 'https://google.us.edi' );
  //     } );
  //   } );

  //   test.describe( 'sanitizedCLPCurrency', () => {
  //     it( 'should return zero if the argument is not defined', () => {
  //       expect( fns.sanitizedCLPCurrency() ).toBe( 0 );
  //     } );
  //     it( 'should return the value as number when the argument is a string', () => {
  //       expect( fns.sanitizedCLPCurrency( 'string' ) ).toBe( 0 );
  //     } );
  //   } );

  //   test.describe( 'satizeAndFormatCLPCurrency', () => {
  //     it( 'should return zero if the argument is not defined plus $ symbol', () => {
  //       expect( fns.satizeAndFormatCLPCurrency() ).toBe( '$0' );
  //     } );
  //     it( 'should return zero if the argument is not a number plus $ symbol', () => {
  //       expect( fns.satizeAndFormatCLPCurrency( 'string' ) ).toBe( '$0' );
  //     } );
  //     it( 'should return the argument formatted with $ symbol', () => {
  //       expect( fns.satizeAndFormatCLPCurrency( '100' ) ).toBe( '$100' );
  //     } );
  //   } );

  //   test.describe( 'toCapitalizeCase', () => {
  //     it( 'should return an empty string if the argument is not defined', () => {
  //       expect( fns.toCapitalizeCase() ).toBe( '' );
  //     } );
  //     it( 'should return the argument with the first letter capitalized', () => {
  //       expect( fns.toCapitalizeCase( 'string' ) ).toBe( 'String' );
  //     } );
  //   } );
  // } )
} );
