import { Logger } from '../../../shared/domain/logger';
import { SupermarketData } from '../../supermarket-data/domain/supermarket-data';

export interface SupermarketScrapper {
  getDataProducts( toSearch: string, Supermarket: SupermarketData, Logger: Logger ): Promise<any[]>; // TODO: IMPROVE
  getDataBanner( Supermarket: SupermarketData ): Promise<any[]>; // TODO: IMPROVE
}
