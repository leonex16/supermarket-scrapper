import { Logger } from '../../../../shared/domain/logger';
import { SupermarketData } from '../../../supermarket-data/domain/supermarket-data';
import { SupermarketScrapper } from '../../domain/supermarket-scrapper';

export class BannersExtractor {
  constructor (
    private readonly _supermarketScrapper: SupermarketScrapper
  ) {}

  async run ( supermarkets: SupermarketData[], logger: Logger ) {
    const rawProducts = await this._supermarketScrapper.getDataBanners( supermarkets, logger );

    return rawProducts;
  }
}
