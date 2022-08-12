import type { ProductResponse } from '.';

const LENGTH_MAX_NAME = 25;

export const formatProducts = ( products: ProductResponse[] ) => {
  const truncNames = products.map( product => ( { ...product, name: product.name.slice( 0, LENGTH_MAX_NAME ) + '...' } ) );

  return truncNames;
};
