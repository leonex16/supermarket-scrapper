import { Basket } from '@Domain/Entities/Basket/Basket';
import { ProductParams } from '@Domain/Entities/Product/Product';
import { BasketCommandRepository, BasketQueryRepository } from '@Domain/Entities/Basket/Respositories';

interface BasketUseCasesConstructor {
  basket: Basket;
  basketCommandRepository: BasketCommandRepository;
  basketQueryRepository: BasketQueryRepository;
}

export class BasketUseCases {
  private _basket: Basket;

  private _basketCommandRepository: BasketCommandRepository;

  private _basketQueryRepository: BasketQueryRepository;

  constructor( { basket, basketCommandRepository, basketQueryRepository }: BasketUseCasesConstructor ) {
    this._basket = basket;
    this._basketCommandRepository = basketCommandRepository;
    this._basketQueryRepository = basketQueryRepository;
  }
  
  addProductUseCase( product: ProductParams ): Basket {
    return this._basketCommandRepository.saveProduct( product );
  }

  removeProductUseCase( productId: string ): Basket {
    return this._basketCommandRepository.removeProduct( productId );
  }

  saveBasketUseCase(): Promise<Basket> {
    return this._basketCommandRepository.saveBasket( );
  }

  getBasketUseCase( basketId: string ): Promise<Basket | null> {
    return this._basketQueryRepository.getBasket( basketId );
  }
}