/* eslint-disable sort-imports */
import { UUID } from '@Domain/Common/Libraries';
import { Basket } from '@Domain/Entities/Basket/Basket';
import { BasketCommandRepository, BasketQueryRepository } from '@Domain/Entities/Basket/Respositories';
import { Product } from '@Domain/Entities/Product/Product';
import { logException } from '@Infrastructure/Common/Functions';

export class BasketRepositoryImplementInMemory implements BasketCommandRepository, BasketQueryRepository {
  private _basketInMemory: Basket[] = [];

  constructor( basketsRawData?: unknown[] ) {
    this._basketInMemory = BasketRepositoryImplementInMemory.parsedBaskets( basketsRawData ?? [] );
  }

  getBasketById( basketId: UUID ): Promise<Basket | null> {
    let foundBasket = null;

    try {
      foundBasket = this._basketInMemory.find( basket => basket.id === basketId ) ?? null;
    } catch ( error ) {
      logException( __filename, error );
    }

    return Promise.resolve( foundBasket );
  }

  async saveBasket( basket: Basket ): Promise<Basket> {
    try {
      this._basketInMemory.push( basket );
    } catch( error ) {
      logException( __filename, error );
    }

    return basket;
  }

  private static parsedBaskets( basketsRawData: unknown[] ): Basket[] {
    return basketsRawData
      .map( ( basket: any ) => Basket
        .create( {
          id: basket.id,
          items: basket.items.map( ( p: any )=> Product.create( p ) )
        } ) );
  }

}