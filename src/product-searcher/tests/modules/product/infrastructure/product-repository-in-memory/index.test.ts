import { expect, test } from '@playwright/test';

import * as VO from '../../../../../modules/product/domain/value-objects';
import { Detail } from '../../../../../modules/product/domain/assigments/Detail';
import { ProductCreator } from '../../../../../modules/product/application/creator/product-creator';
import { ProductRepositoryInMemory } from '../../../../../modules/product/infrastructure/product-repository-in-memory';

test.describe( 'ProductRepositoryInMemory', () => {
  test.describe( 'ProductCreator', () => {
    test.describe( 'Save method', () => {
      test( 'should save the product without error', async () => {
        const productRepositoryInMemory = new ProductRepositoryInMemory();
        const productCreator = new ProductCreator( productRepositoryInMemory );
        const id = new VO.Id( 'UUID' );
        const name = VO.Name.create( 'PRODUCT NAME' );
        const description = VO.Description.create( 'PRODUCT DESCRIPTION' );
        const detail = Detail.create( '100', '50', '1KG' );
        const image = VO.Image.create();
        const source = VO.Source.create( 'https://www.google.com' );

        await expect( productCreator.run(
          id,
          name,
          description,
          detail,
          image,
          source
        ) ).resolves.toBeUndefined();
      } );
    } );
  } );

  // test.describe( 'Get method', () => {
  //   test( 'should get the product without error', async () => {
  //     const productRepositoryInMemory = new ProductRepositoryInMemory();
  //     const productCreator = new ProductCreator( productRepositoryInMemory );
  //     const id = new VO.Id( 'UUID' );
  //     const name = VO.Name.create( 'PRODUCT NAME' );
  //     const description = VO.Description.create( 'PRODUCT DESCRIPTION' );
  //     const detail = Detail.create( '100', '50', '1KG' );
  //     const image = VO.Image.create();
  //     const source = VO.Source.create( 'https://www.google.com' );

  //     await expect( async () => productCreator.run(
  //       id,
  //       name,
  //       description,
  //       detail,
  //       image,
  //       source
  //     ) ).resolves.toBeUndefined();
  //   } );
  // } );
} );
