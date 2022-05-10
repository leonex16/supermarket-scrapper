import chai from 'chai';
import chaiHttp from 'chai-http';

chai
  .use( chaiHttp );

await Promise.all( [
  import( '#src/__tests__/functions/index.spec' ),
  import( '#src/__tests__/routes/supermarket.spec' ),
  import( '#src/__tests__/scrapper/useCases/getProducts.spec' ),
  import( '#src/__tests__/scrapper/entities/Product.spec' ),
] );
