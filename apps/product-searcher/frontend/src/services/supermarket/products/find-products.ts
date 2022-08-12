import type { ProductResponse } from '.';
import { RequestHttp } from '../../../models/request-http';

const ENDPOINT_URL = '/api/supermarket/products';

const requestHttp = new RequestHttp();

export const findProducts = async ( productToSearch: string, supermarketsToSearch: string[] ) => {
  const requestPromises = supermarketsToSearch.map( s => requestHttp.get<ProductResponse[]>( `${ ENDPOINT_URL }?p=${ productToSearch }&s=${ s }` ) );
  type ValueTypeReturned = Awaited<typeof requestPromises[0]>
  const responses = await Promise.allSettled( requestPromises );

  const fulfilledPromises = responses.filter( res => res.status === 'fulfilled' ) as PromiseFulfilledResult<ValueTypeReturned>[];
  const matrixProducts = fulfilledPromises.map( res => res.value.data );

  return matrixProducts;
};
