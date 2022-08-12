/* eslint-disable no-unused-expressions */
import { expect, test } from '@playwright/test';

test.describe( 'Supermarket endpoint', () => {
  test.describe( 'GET - /supermarket/product', () => {
    test( 'should returns a 200 status code and a JSON object with data', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/products', {
        params: {
          product: 'bebida',
          supermarket: 'lider'
        }
      } );

      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 200 );
      expect( body.isOk ).toBe( true );
      expect( body.data.length ).toBeGreaterThan( 3 );
    } );

    test( 'should return 400 status when qs product to be undefined', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/products', {
        params: {
          supermarket: 'lider'
        }
      } );
      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 400 );
      expect( body.isOk ).toBe( false );
      expect( body.message ).toBe( 'Data input is not correct >> product argument required' );
    } );

    test( 'should return 400 status when qs supermarket to be undefined', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/products', {
        params: {
          product: 'bebida'
        }
      } );
      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 400 );
      expect( body.isOk ).toBe( false );
      expect( body.message ).toBe( 'Data input is not correct >> supermarket argument required' );
    } );
  } );

  // test.describe( 'GET - /supermarket/banner', () => {
  // } );
} );
