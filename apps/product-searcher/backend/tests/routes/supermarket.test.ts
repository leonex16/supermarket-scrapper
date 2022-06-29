/* eslint-disable no-unused-expressions */
import { expect, test } from '@playwright/test';

test.describe( 'Supermarket endpoint', () => {
  test.describe( 'GET - /supermarket/product', () => {
    test( 'should returns a 200 status code and a JSON object with data', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/product', {
        params: {
          qproduct: 'bebida',
          qsupermarket: 'lider'
        }
      } );
      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 200 );
      expect( body.isOk ).toBe( true );
      expect( body.data.length ).toBeGreaterThan( 3 );
    } );

    test( 'should return 400 status when qproduct to be undefined', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/product', {
        params: {
          qsupermarket: 'lider'
        }
      } );
      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 400 );
      expect( body.isOk ).toBe( false );
      expect( body.message ).toBe( 'Data input is not correct >> qproduct argument required' );
    } );

    test( 'should return 400 status when qsupermarket to be undefined', async ( { request } ) => {
      const response = await request.get( '/api/v1/supermarket/product', {
        params: {
          qproduct: 'bebida'
        }
      } );
      const body = await response.json();

      expect( response.headers()[ 'content-type' ] ).toMatch( /json/ );
      expect( response.status() ).toBe( 400 );
      expect( body.isOk ).toBe( false );
      expect( body.message ).toBe( 'Data input is not correct >> qsupermarket argument required' );
    } );
  } );

  // test.describe( 'GET - /supermarket/banner', () => {
  // } );
} );
