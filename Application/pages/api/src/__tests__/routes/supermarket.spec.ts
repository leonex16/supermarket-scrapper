/* eslint-disable no-unused-expressions */
import request from 'supertest';

jest.setTimeout( 120000 );

let HAPPY_PATH = Object.freeze( {
  BODY_1: {
    qproduct: 'bebida',
    qsupermarket: 'lider',
  },
} );

let BAD_PATH = Object.freeze( {
  BODY_1: {
    qsupermarket: 'lider',
  },
  BODY_2: {
    qproduct: 'bebida',
  },
} );

beforeEach( () => {
  HAPPY_PATH = { ...HAPPY_PATH };
  BAD_PATH = { ...BAD_PATH };
} );

const requester = request( 'https://127.0.0.1:8080/api/v1' );

describe( 'Supermarket endpoint', () => {

  describe( 'GET - /supermarket', () => {
    it( 'should returns a 200 status code and a JSON object with data', async () => {
      const response = await requester.get( '/supermarket' ).query( HAPPY_PATH.BODY_1 );
      
      expect( response.headers['content-type']).toMatch( /json/ );
      expect( response.statusCode ).toBe( 200 );
      expect( response.body.isOk ).toBe( true );
      expect( response.body.data.products.length ).toBeGreaterThan( 3 );
    } );

    it( 'should return 400 status when qproduct to be undefined', async () => {
      const response = await requester.get( '/supermarket' ).query( BAD_PATH.BODY_1 );

      expect( response.headers['content-type']).toMatch( /json/ );
      expect( response.status ).toBe( 400 );
      expect( response.body.isOk ).toBe( false );
      expect( response.body.message ).toBe( 'qproduct argument required' );
    } );

    it( 'should return 400 status when qsupermarket to be undefined', async () => {
      const response = await requester.get( '/supermarket' ).query( BAD_PATH.BODY_2 );

      expect( response.headers['content-type']).toMatch( /json/ );
      expect( response.status ).toBe( 400 );
      expect( response.body.isOk ).toBe( false );
      expect( response.body.message ).toBe( 'qsupermarket argument required' );
    } );
  } );
} );
