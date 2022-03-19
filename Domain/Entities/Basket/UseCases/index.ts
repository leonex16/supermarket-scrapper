import { Basket } from '@Entities/Basket/Basket';
import { Product } from '@Entities/Product/Product';
import { BasketCommandRepository, BasketQueryRepository } from '@Entities/Basket/Respositories';

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
  
  addProductUseCase( product: Product ): Basket {
    return this._basketCommandRepository.saveProduct( this._basket, product );
  }

  removeProductUseCase( productId: string ): Basket {
    return this._basketCommandRepository.removeProduct( this._basket, productId );
  }

  saveBasketUseCase(): Promise<Basket> {
    return this._basketCommandRepository.saveBasket( this._basket );
  }

  getBasketUseCase( basketId: string ): Promise<Basket> {
    return this._basketQueryRepository.getBasket( basketId );
  }
}