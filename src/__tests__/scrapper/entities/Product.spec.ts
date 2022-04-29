/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import { GeneratorData } from '#src/libs/GeneratorData';
import { Product } from '#src/scrapper/entities/Product';

const generatorData = new GeneratorData();
let RAW_PRODUCT: any;

beforeEach( () => {
  RAW_PRODUCT = {
    HAPPY_PATH: {
      name: generatorData.randProductName( { randUndefined: false } ),
      description: generatorData.randProductDescription(),
      detail: {
        normalPrice: generatorData.randProductPrice( { randUndefined: false } ),
        bestPrice: generatorData.randProductPrice(),
        unit: generatorData.randProductUnit(),
      },
      image: generatorData.randImg(),
      url: generatorData.randUrl( { randUndefined: false } ),
    },
    BAD_PATH: {
      name: generatorData.randProductName(),
      description: generatorData.randProductDescription(),
      detail: {
        normalPrice: generatorData.randProductPrice(),
        bestPrice: generatorData.randProductPrice(),
        unit: generatorData.randProductUnit(),
      },
      image: generatorData.randImg(),
      url: generatorData.randUrl(),
    },
  };
} );

describe( 'Entity Product', () => {
  describe( 'Create method', () => {
    it( 'should returns an instanfe of product', () => {
      const product = Product.create( RAW_PRODUCT.HAPPY_PATH );

      expect( product ).to.be.an.instanceOf( Product );
    } );

    it( 'should formats normal and best price', () => {
      const product = Product.create( RAW_PRODUCT.HAPPY_PATH );

      expect( product?.normalPrice ).to.contains( '$' );
      expect( product?.bestPrice ).to.contains( '$' );
    } );

    it( 'should returns undefined if product name is undefined', () => {
      RAW_PRODUCT.BAD_PATH.name = undefined;
      const product = Product.create( RAW_PRODUCT.BAD_PATH );

      expect( product ).to.be.undefined;
    } );

    it( 'should returns undefined if product normalPrice is undefined', () => {
      RAW_PRODUCT.BAD_PATH.detail.normalPrice = undefined;
      const product = Product.create( RAW_PRODUCT.BAD_PATH );

      expect( product ).to.be.undefined;
    } );

    it( 'should returns undefined if product url is undefined', () => {
      RAW_PRODUCT.BAD_PATH.url = undefined;
      const product = Product.create( RAW_PRODUCT.BAD_PATH );

      expect( product ).to.be.undefined;
    } );
  } );
} );
