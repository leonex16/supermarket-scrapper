/* eslint-disable require-atomic-updates */
import { expect, test } from '@playwright/test';

test.describe( 'Middlewares', () => {
  test.describe( 'HandleResponse', () => {
    test( 'should always return the same structure of response ( depending on status code e.g. 204 ) ', async ( { request } ) => {
      const response = await request.get( '/api/v1/health/version' );
      const body = await response.json();

      expect( body ).toHaveProperty( 'isOk' );
      expect( body ).toHaveProperty( 'data' );
      expect( body ).toHaveProperty( 'message' );
    } );
  } );

  test.describe( 'Handle404', () => {
    test( 'GET - should always return 404 if resource is not found', async ( { request } ) => {
      const response = await request.get( '/resource-is-not-exist' );
      const body = await response.json();

      expect( body.isOk ).toBe( false );
      expect( body.data ).toBeNull();
      expect( body.message ).toBe( 'Resource not found >> GET - /resource-is-not-exist' );
    } );

    test( 'POST - should always return 404 if resource is not found', async ( { request } ) => {
      const response = await request.post( '/resource-is-not-exist' );
      const body = await response.json();

      expect( body.isOk ).toBe( false );
      expect( body.data ).toBeNull();
      expect( body.message ).toBe( 'Resource not found >> POST - /resource-is-not-exist' );
    } );

    test( 'PUT - should always return 404 if resource is not found', async ( { request } ) => {
      const response = await request.put( '/resource-is-not-exist' );
      const body = await response.json();

      expect( body.isOk ).toBe( false );
      expect( body.data ).toBeNull();
      expect( body.message ).toBe( 'Resource not found >> PUT - /resource-is-not-exist' );
    } );

    test( 'PATCH - should always return 404 if resource is not found', async ( { request } ) => {
      const response = await request.patch( '/resource-is-not-exist' );
      const body = await response.json();

      expect( body.isOk ).toBe( false );
      expect( body.data ).toBeNull();
      expect( body.message ).toBe( 'Resource not found >> PATCH - /resource-is-not-exist' );
    } );

    test( 'DELETE - should always return 404 if resource is not found', async ( { request } ) => {
      const response = await request.delete( '/resource-is-not-exist' );
      const body = await response.json();

      expect( body.isOk ).toBe( false );
      expect( body.data ).toBeNull();
      expect( body.message ).toBe( 'Resource not found >> DELETE - /resource-is-not-exist' );
    } );
  } );
} );
