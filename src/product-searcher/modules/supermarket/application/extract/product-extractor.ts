import { Logger } from '../../../../shared/domain/logger';
import { Product } from '../../../product/domain/product';
import { Supermarket } from '../../domain/supermarket';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';
import type { Supermarkets } from '../../shared/types';

export class ProductExtractor {
  constructor (
    private readonly _supermarketScrapper: SupermarketScrapper
  ) {}

  async run ( toSearch: string, SUPERMARKET: Supermarkets, logger: Logger ) {
    const supermarket = new Supermarket( SUPERMARKET );
    const rawProducts = await this._supermarketScrapper.getDataProducts( toSearch, supermarket, logger );

    return this._parseRawProductsToProductInstance( rawProducts );
  }

  private _parseRawProductsToProductInstance ( rawProducts: any[] ) {
    return rawProducts.map( rawProduct => {
      return Product.create( rawProduct );
    } );
  }
}
