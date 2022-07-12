import { Logger } from '../../../shared/domain/logger';
import { SupermarketData } from '../../supermarket-data/domain/supermarket-data';

export interface SupermarketScrapper {
  getDataProducts( toSearch: string, supermarket: SupermarketData, logger: Logger ): Promise<any[]>; // TODO: IMPROVE
  getDataBanners( supermarket: SupermarketData[], logger: Logger ): Promise<any[]>; // TODO: IMPROVE
}
