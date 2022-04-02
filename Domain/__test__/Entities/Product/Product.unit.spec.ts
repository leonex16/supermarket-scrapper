import { Product } from '@Domain/Entities/Product/Product';

let productParams: any = {};

beforeEach( () => {
  productParams = {
    id: '1',
    name: 'product-name',
    description: 'product-description',
    detail: {
      normalPrice: '1000',
      bestPrice: '800',
      unit: 'unit',
    },
    image: 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
    source: 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url'
  };
} );

describe( 'Product should...', () => {
  it( 'can create an instance', () => {
    const product = Product.create( productParams );
    
    expect( product ).toBeInstanceOf( Product );
  } );

  it( 'get same data from original params', () => {
    const product = Product.create( productParams );

    expect( product.id ).toBe( productParams.id );
    expect( product.name ).toBe( productParams.name );
    expect( product.description ).toBe( productParams.description );
    expect( product.detail.normalPrice ).toBe( productParams.detail.normalPrice );
    expect( product.detail.bestPrice ).toBe( productParams.detail.bestPrice );
    expect( product.detail.unit ).toBe( productParams.detail.unit );
    expect( product.image ).toBe( productParams.image );
    expect( product.source ).toBe( productParams.source );
  } );

  it( 'allow create an instance, missing description and the value got, must be null', () => {
    delete productParams.description;
    const product = Product.create( productParams );

    expect( product ).toBeInstanceOf( Product );
    expect( product.description ).toBeNull();
  } );


  it( 'allow create an instance, missing normalPrice and the value got, must be null', () => {
    delete productParams.detail.normalPrice;
    const product = Product.create( productParams );

    expect( product ).toBeInstanceOf( Product );
    expect( product.detail.normalPrice ).toBeNull();
  } );


  it( 'allow create an instance, missing bestPrice and the value got, must be null', () => {
    delete productParams.detail.bestPrice;
    const product = Product.create( productParams );

    expect( product ).toBeInstanceOf( Product );
    expect( product.detail.bestPrice ).toBeNull();
  } );

  it ( 'throws an error when the name to be undefined', () => {
    delete productParams.name;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The name value is required' );
  } );

  it ( 'throws an error when the unit to be undefined', () => {
    delete productParams.detail.unit;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The unit value is required' );
  } );

  it ( 'throws an error when the image to be undefined', () => {
    delete productParams.image;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The image value is required' );
  } );
  
  it ( 'throws an error when the source to be undefined', () => {
    delete productParams.source;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The source value is required' );
  } );

  it ( 'throws an error when the name to be empty', () => {
    productParams.name = '';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The name value can not be empty' );
  } );

  it ( 'throws an error when the unit to be empty', () => {
    productParams.detail.unit = '';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The unit value can not be empty' );
  } );

  it ( 'throws an error when the image to be empty', () => {
    productParams.image = '';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The image value can not be empty' );
  } );

  it ( 'throws an error when the source to be empty', () => {
    productParams.source = '';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The source value can not be empty' );
  } );

  it ( 'throws an error when the name has a length less than 2', () => {
    const testValue = 'a'.repeat( 2 - 1 );
    productParams.name = testValue;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The name value is too short' );
  } );

  it ( 'throws an error when the name has a length greater than 25', () => {
    const testValue = 'a'.repeat( 25 + 1 );
    productParams.name = testValue;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The name value is too large' );
  } );

  it ( 'throws an error when the description has a length greater than 50', () => {
    const testValue = 'a'.repeat( 50 + 1 );
    productParams.description = testValue;
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The description value is too large' );
  } );

  it ( 'throws an error when the image has a value no valid', () => {
    productParams.image = 'invalid-url';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The image value is not valid' );
  } );

  it ( 'throws an error when the source has a value no valid', () => {
    productParams.source = 'invalid-url';
    expect( () => Product.create( productParams ) )
      .toThrowError( 'The source value is not valid' );
  } );
} );