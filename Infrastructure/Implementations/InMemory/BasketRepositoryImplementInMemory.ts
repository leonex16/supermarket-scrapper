import { Basket } from '@Domain/Entities/Basket/Basket';
import { Product } from '@Domain/Entities/Product/Product';
import { UUID } from '@Domain/Common/Libraries';
import { logException } from '@Infrastructure/Common/Functions';
import { BasketCommandRepository, BasketQueryRepository } from '@Domain/Entities/Basket/Respositories';

export class BasketRepositoryImplementInMemory implements BasketCommandRepository, BasketQueryRepository {
  private _basketInMemory: Basket[] = [];

  constructor( basketsRawData: unknown[] ) {
    this._basketInMemory = BasketRepositoryImplementInMemory.parsedBaskets( basketsRawData );
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
    return ( basketsRawData as Basket[] )
      .map( ( basket: Basket ) => Basket
        .create( {
          id: basket.id,
          items: basket.items.map( ( p: Product )=> Product.parse( p ) )
        } ) );
  }

}