import { Logger } from '../../../../shared/domain/logger';
import { Product } from '../../../product/domain/product';
import { SupermarketData } from '../../../supermarket-data/domain/supermarket-data';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';

export class ProductsExtractor {
  constructor (
    private readonly _supermarketScrapper: SupermarketScrapper
  ) {}

  async run ( toSearch: string, supermarket: SupermarketData, logger: Logger ) {
    const products = await this._supermarketScrapper.getDataProducts( toSearch, supermarket, logger );

    return this._parseRawProductsToProductInstance( products );
  }

  private _parseRawProductsToProductInstance ( products: { [key: string]: any[] } ) { // TODO: IMPROVE
    return Object.entries( products ).map( ( [ supermarketName, rawProducts ] ) => {
      return { [ supermarketName ]: rawProducts.map( rawProduct => Product.create( rawProduct ).toJsonResponse() ) };
    } );
  }
}
