import { Logger } from '../../../../shared/domain/logger';
import { Product } from '../../../product/domain/product';
import { SupermarketData } from '../../../supermarket-data/domain/supermarket-data';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';

export class ProductsExtractor {
  constructor (
    private readonly _supermarketScrapper: SupermarketScrapper
  ) {}

  async run ( toSearch: string, supermarket: SupermarketData, logger: Logger ) {
    const rawProducts = await this._supermarketScrapper.getDataProducts( toSearch, supermarket, logger );

    return this._parseRawProductsToProductInstance( rawProducts );
  }

  private _parseRawProductsToProductInstance ( rawProducts: any[] ) { // TODO: IMPROVE
    return rawProducts.map( rawProduct => {
      return Product.create( rawProduct ).toJsonResponse();
    } );
  }
}
