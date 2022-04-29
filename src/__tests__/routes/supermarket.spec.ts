/* eslint-disable no-unused-expressions */
import chai from 'chai';

import { ResponseHttp } from '#src/models/index';

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

const { expect } = chai;
const requester = chai.request( 'https://127.0.0.1:8080/api/v1' );
const promises = [
  requester.get( '/supermarket' ).query( HAPPY_PATH.BODY_1 ),
  requester.get( '/supermarket' ).query( BAD_PATH.BODY_1 ),
  requester.get( '/supermarket' ).query( BAD_PATH.BODY_2 ),
];
const responses = await Promise.allSettled( promises );

beforeEach( () => {
  HAPPY_PATH = { ...HAPPY_PATH };
  BAD_PATH = { ...BAD_PATH };
} );

describe( 'Supermarket endpoint', () => {
  describe( 'GET - /supermarket', () => {
    it( 'should returns a 200 status code and a JSON object with data', () => {
      const { status, value } = responses[ 0 ] as unknown as PromiseFulfilledResult<Response>;
      const { data, isOk } = value?.body as unknown as ResponseHttp;

      expect( status ).to.equal( 'fulfilled' );
      expect( value.status ).to.equal( 200, 'statusCode is not 200' );
      expect( isOk ).to.be.true;
      expect( data.products?.length ).to.has.greaterThanOrEqual( 0, `length data value is ${ data.products?.length }` );
    } );

    it( 'should return 400 status when qproduct to be undefined', () => {
      const { status, value } = responses[ 1 ] as unknown as PromiseFulfilledResult<Response>;
      const { isOk, message } = value?.body as unknown as ResponseHttp;

      expect( status ).to.equal( 'fulfilled' );
      expect( value.status ).to.equal( 400, 'statusCode is not 200' );
      expect( isOk ).to.be.false;
      expect( message ).to.be.equal( 'qproduct argument required' );
    } );

    it( 'should return 400 status when qsupermarket to be undefined', () => {
      const { status, value } = responses[ 2 ] as unknown as PromiseFulfilledResult<Response>;
      const { isOk, message } = value?.body as unknown as ResponseHttp;

      expect( status ).to.equal( 'fulfilled' );
      expect( value.status ).to.equal( 400, 'statusCode is not 200' );
      expect( isOk ).to.be.false;
      expect( message ).to.be.equal( 'qsupermarket argument required' );
    } );
  } );
} );
