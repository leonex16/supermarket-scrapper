import { SupermarketData } from '../../domain/supermarket-data';
import { SupermarketDoesNotSupport } from './supermarket-does-not-support';

export class SupermarketFinder {
  constructor (
    private _supermarketsData: SupermarketData[]
  ) {}

  run ( supermarket: string ) {
    const supermarketFounded = this._supermarketsData.find( s => s.name.toLowerCase() === supermarket.toLowerCase() );

    if ( supermarketFounded === undefined ) throw new SupermarketDoesNotSupport( supermarket );

    return supermarketFounded;
  }
}
