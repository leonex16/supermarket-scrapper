import { Basket } from '@Domain/Entities/Basket/Basket';
import { Product, ProductParams } from '@Domain/Entities/Product/Product';
import { BasketCommandRepository, BasketQueryRepository } from '@Domain/Entities/Basket/Respositories';

import { BasketQueryRepositoryInMemory } from '@Infrastructure/Implementations/InMemory/BasketQueryRepositoryInMemory';
import { NotFoundException } from '@Infrastructure/Common/Exceptions';
import { UUIDImplementation } from '@Infrastructure/Libraries/UUIDImplementation';
import { findByIdAndRemove, logException } from '@Infrastructure/Common/Functions';

import basketsRaw from './data/baskets.json';

export class BasketCommandRepositoryInMemory implements BasketCommandRepository {
  private _basket: Basket;

  private _basketInMemory: Basket[];

  private _basketQueryRepository: BasketQueryRepository; 

  constructor() {
    this._basket = Basket.create( { id: UUIDImplementation.generate(), items: [] } );
    this._basketInMemory = basketsRaw.map( basket => Basket.create( { id: basket.id, items: basket.items.map( p => Product.create( p ) ) } ) );
    this._basketQueryRepository = new BasketQueryRepositoryInMemory();
  }

  async saveBasket(): Promise<Basket> {
    try {
      const existsBasket: Basket | null = await this._basketQueryRepository.getBasket( this._basket.id );

      if ( existsBasket ) this._basket.items = [ ...this._basket.items, ...existsBasket.items ];
      
      this._basketInMemory.push( this._basket );

    } catch ( error ) {
      logException( __filename, error );
    }

    return this._basket;
  }

  saveProduct( product: ProductParams ) {
    try {
      const prod = Product.create( product );
      this._basket.items.push( prod );

    } catch ( error ) {
      logException( __filename, error );
    }

    return this._basket;
  }

  removeProduct( productId: string ) {
    try {
      const basketIndex = this._basket.items.findIndex( prod => prod.id === productId );
  
      if ( basketIndex === -1 ) throw new NotFoundException();
  
      this._basket.items = findByIdAndRemove( this._basket.items, productId );
      
    } catch ( error ) {
      logException( __filename, error );
    }
    
    return this._basket;
  }


}