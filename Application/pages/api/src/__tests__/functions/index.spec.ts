import * as fns from '@Application/pages/api/src/functions/index';

describe( 'Functions', () => {
  describe( 'formatToCLPCurrency', () => {
    it( 'should return zero if the argument is not defined plus $ symbol', () => {
      expect( fns.formatToCLPCurrency() ).toBe( '$0' );
    } );
    it( 'should return zero if the argument is not a number plus $ symbol', () => {
      expect( fns.formatToCLPCurrency( 'string' ) ).toBe( '$0' );
    } );
    it( 'should return the argument formatted with $ symbol', () => {
      expect( fns.formatToCLPCurrency( 100 ) ).toBe( '$100' );
      expect( fns.formatToCLPCurrency( '100' ) ).toBe( '$100' );
    } );
  } );

  describe( 'removeQueryString', () => {
    it( 'should return an empty string if the value does not match with split argument ', () => {
      expect( fns.removeQueryString( '' ) )
        .toBe( '' );
    } );
    it( 'should returns the url without query string', () => {
      expect( fns.removeQueryString( 'https://google.us.edi?34535/534534?dfg=g&f' ) )
        .toBe( 'https://google.us.edi' );
    } );
  } );

  describe( 'sanitizedCLPCurrency', () => {
    it( 'should return zero if the argument is not defined', () => {
      expect( fns.sanitizedCLPCurrency() ).toBe( 0 );
    } );
    it( 'should return the value as number when the argument is a string', () => {
      expect( fns.sanitizedCLPCurrency( 'string' ) ).toBe( 0 );
    } );
  } );

  describe( 'satizeAndFormatCLPCurrency', () => {
    it( 'should return zero if the argument is not defined plus $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency() ).toBe( '$0' );
    } );
    it( 'should return zero if the argument is not a number plus $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency( 'string' ) ).toBe( '$0' );
    } );
    it( 'should return the argument formatted with $ symbol', () => {
      expect( fns.satizeAndFormatCLPCurrency( '100' ) ).toBe( '$100' );
    } );
  } );

  describe( 'toCapitalizeCase', () => {
    it( 'should return an empty string if the argument is not defined', () => {
      expect( fns.toCapitalizeCase() ).toBe( '' );
    } );
    it( 'should return the argument with the first letter capitalized', () => {
      expect( fns.toCapitalizeCase( 'string' ) ).toBe( 'String' );
    } );
  } );
} );
