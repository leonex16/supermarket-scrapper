import { Logger } from '../../../shared/domain/logger';
import { Supermarket } from './supermarket';

export interface SupermarketScrapper {
  getDataProducts( toSearch: string, Supermarket: Supermarket, Logger: Logger ): Promise<any[]>;
  getBanner( Supermarket: Supermarket ): Promise<any[]>;
}
