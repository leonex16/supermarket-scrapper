import type { NextApiRequest, NextApiResponse } from 'next';

import type { ProductResponse } from '../../../src/services/supermarket/products';
import { RequestHttp } from '../../../src/models/request-http';

const requestHttp = new RequestHttp( 'https://127.0.0.1:8080' );

export default async function handler ( req: NextApiRequest, res: NextApiResponse ) {
  const { p, s } = req.query;

  const response = await requestHttp.get<ProductResponse[]>( `/api/v1/supermarket/products?product=${ p }&supermarket=${ s }` );

  res.status( 200 ).json( response );
}
