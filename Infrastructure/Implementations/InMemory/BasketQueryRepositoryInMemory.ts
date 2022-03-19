import { Basket } from '@Domain/Entities/Basket/Basket';
import { BasketQueryRepository } from '@Domain/Entities/Basket/Respositories';

import basketsRaw from './data/baskets.json';

export class BasketQueryRepositoryInMemory implements BasketQueryRepository {
  private readonly _basketInMemory: any[] = basketsRaw;

  getBasket( basketId: string ): Promise<Basket | null > {
    const foundBasket = this._basketInMemory.find( basket => basket.id === basketId );

    return Promise.resolve( 
      foundBasket !== undefined 
        ? Basket.create( foundBasket )
        : null 
    );
  }
}
