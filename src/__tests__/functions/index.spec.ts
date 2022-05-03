import { expect } from 'chai';

import * as fns from '#src/functions/index';

describe( 'Functions', () => {
  describe( 'formatToCLPCurrency', () => {
    it( 'should return zero if the argument is not defined plus $ symbol', () => {
      expect( fns.formatToCLPCurrency() ).to.be.equal( '$0' );
    } );
    it( 'should return zero if the argument is not a number plus $ symbol', () => {
      expect( fns.formatToCLPCurrency( 'string' ) ).to.be.equal( '$0' );
    } );
    it( 'should return the argument formatted with $ symbol', () => {
      expect( fns.formatToCLPCurrency( 100 ) ).to.be.equal( '$100' );
      expect( fns.formatToCLPCurrency( '100' ) ).to.be.equal( '$100' );
    } );
  } );

  describe( 'removeQueryString', () => {
    it( 'should return an empty string if the value does not match with split argument ', () => {
      expect( fns.removeQueryString( '' ) )
        .to.be.equal( '' );
    } );
    it( 'should returns the url without query string', () => {
      expect( fns.removeQueryString( 'https://google.us.edi?34535/534534?dfg=g&f' ) )
        .to.be.equal( 'https://google.us.edi' );
    } );
  } );

  describe( 'sanitizedCLPCurrency', () => {
    it( 'should return zero if the argument is not defined', () => {
      expect( fns.sanitizedCLPCurrency() ).to.be.equal( 0 );
    } );
    it( 'should return the value as number when the argument is a string', () => {
      expect( fns.sanitizedCLPCurrency( 'string' ) ).to.be.equal( 0 );
    } );
  } );

  describe( 'satizeAndFormatCLPCurrency', () => {
    it( 'should return zero if the argument is not defined plus $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency() ).to.be.equal( '$0' );
    } );
    it( 'should return zero if the argument is not a number plus $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency( 'string' ) ).to.be.equal( '$0' );
    } );
    it( 'should return the argument formatted with $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency( '100' ) ).to.be.equal( '$100' );
    } );
  } );

  describe( 'toCapitalizeCase', () => {
    it( 'should return an empty string if the argument is not defined', () => {
      expect( fns.toCapitalizeCase() ).to.be.equal( '' );
    } );
    it( 'should return the argument with the first letter capitalized', () => {
      expect( fns.toCapitalizeCase( 'string' ) ).to.be.equal( 'String' );
    } );
  } );
} );
