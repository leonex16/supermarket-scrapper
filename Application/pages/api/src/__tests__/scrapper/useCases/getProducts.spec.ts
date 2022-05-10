/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-shadow */
// @ts-ignore

import { GeneratorData } from '@server/libs/GeneratorData';
import { getProducts } from '@server/scrapper/useCases/getProducts';

jest.setTimeout( 60000 );

describe( 'Get product use case', () => {
  describe( 'When recieve argument invalids', () => {
    it( 'should throws an error, when product name will not be empty string', async () => {
      try {
        const supermarket = GeneratorData.randSupermarket();
        await getProducts( '', supermarket );
        throw new Error( `${ supermarket } - Should not reach this point` );
      } catch ( error: any ) {
        expect( error.message ).toBe( 'Product name can not to be empty' );
      }
    } );

    it( 'should return an error, supermarket value will be a valid supermarket', async () => {
      try {
        await getProducts( 'bebida', 'no-supermarket-valid' as any );
        throw new Error( 'Should not reach this point' );
      } catch ( error: any ) {
        expect( error.message ).toBe( 'Supermarket value just to be Lider or Jumbo' );
      }
    } );

    it( 'should throws an error when product not found', async () => {
      try {
        const supermarket = GeneratorData.randSupermarket();
        await getProducts( 'abcdefg', supermarket );
        throw new Error( `${ supermarket } - Should not reach this point` );
      } catch ( error: any ) {
        expect( error.message ).toBe( 'Product not found' );
      }
    } );
  } );

  describe( 'When recieve valid argument...', () => {
    it( 'should return an array of products', async () => {
      const supermarket = GeneratorData.randSupermarket();
      const { products } = await getProducts( 'bebida', supermarket );

      expect( products.length ).toBeGreaterThan( 3 );
    } );

    it( 'should whole products have name, price ,and url properties', async () => {
      const supermarket = GeneratorData.randSupermarket();
      const { products } = await getProducts( 'bebida', supermarket );
      const existUndefinedElem = products.some( product => product === undefined );

      expect( existUndefinedElem ).toBeFalsy();
    } );
  } );
} );
