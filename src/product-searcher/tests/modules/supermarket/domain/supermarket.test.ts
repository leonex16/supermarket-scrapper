import { expect, test } from '@playwright/test';

import { Supermarket } from '../../../../modules/supermarket/domain/supermarket';
import { SupermarketDoesNotSupport } from '../../../../modules/supermarket/domain/errors';

test.describe( 'Supermarket', () => {
  test.describe( 'HappyPath', () => {
    test.describe( 'Create instance', () => {
      test( 'should create instances with supported supermarkets', () => {
        expect( () => new Supermarket( 'JUMBO' ) ).not.toThrowError();
        expect( () => new Supermarket( 'LIDER' ) ).not.toThrowError();
      } );
    } );

    test.describe( 'Get css selectors', () => {
      test( 'should gets css selectors once created the instance', () => {
        const supermarketJumbo = new Supermarket( 'JUMBO' );
        const supermarketLider = new Supermarket( 'LIDER' );

        expect( supermarketJumbo.getSelectors().NAME ).toBe( 'Jumbo' );
        expect( supermarketLider.getSelectors().NAME ).toBe( 'Lider' );
      } );
    } );
  } );

  test.describe( 'BadPath', () => {
    test.describe( 'Create instance', () => {
      test( 'should throws an error if the supermarket does not supported', () => {
        const SUPPERMARKET_NOT_SUPPORTED = 'SUPPERMARKET_NOT_SUPPORTED' as any;

        expect( () => new Supermarket( SUPPERMARKET_NOT_SUPPORTED ) ).toThrowError( new SupermarketDoesNotSupport( SUPPERMARKET_NOT_SUPPORTED ) );
      } );
    } );
  } );
} );
