import { expect, test } from '@playwright/test';

import { version } from '../../package.json';

test.describe( 'Health endpoint', () => {
  test.describe( 'GET - /health', () => {
    test( 'should return 204 as status code', async ( { request } ) => {
      const response = await request.get( '/api/v1/health' );

      expect( response.status() ).toBe( 204 );
    } );

    test( 'should return the backend version', async ( { request } ) => {
      const response = await request.get( '/api/v1/health/version' );
      const body = await response.json();

      expect( response.status() ).toBe( 200 );
      expect( body.data.version ).toBe( version );
    } );
  } );
} );
