import chai from 'chai';
import chaiHttp from 'chai-http';

chai
  .use( chaiHttp );

await Promise.all( [
  import( '@server/__tests__/functions/index.spec' ),
  import( '@server/__tests__/routes/supermarket.spec' ),
  import( '@server/__tests__/scrapper/useCases/getProducts.spec' ),
  import( '@server/__tests__/scrapper/entities/Product.spec' ),
] );
