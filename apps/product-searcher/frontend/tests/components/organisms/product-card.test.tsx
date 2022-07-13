import { expect, test } from '@playwright/experimental-ct-react';

import { ProductCard, ProductCardProps } from '../../../src/components/organisms/product-card';

const productProps: ProductCardProps = {
  name: 'Product Name',
  description: 'Product Description',
  unit: 'Kg',
  price: '$100',
  image: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
  source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage'
};

test.describe( '<ProductCard />', () => {
  test( 'should render component', async ( { mount } ) => {
    const component = await mount( <ProductCard {...productProps} /> );

    await expect( component.locator( `text="${ productProps.name }"` ) ).toBeVisible();
    await expect( component.locator( `text="${ productProps.description }"` ) ).toBeVisible();
    await expect( component.locator( `text="${ productProps.unit }"` ) ).toBeVisible();
    await expect( component.locator( `text="${ productProps.price }"` ) ).toBeVisible();
    await expect( component.locator( 'text="Agregar al Carrito"' ) ).toBeVisible();
  } );
} );
