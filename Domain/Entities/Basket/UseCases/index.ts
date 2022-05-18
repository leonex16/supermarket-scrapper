import { Basket } from '@Domain/Entities/Basket/Basket';
import {
  BasketCommandRepository,
  BasketQueryRepository,
} from '@Domain/Entities/Basket/Respositories';
import { MethodNotExecutedException, NotFoundException } from '@Domain/Common/Exceptions';
import { Product, ProductParams } from '@Domain/Entities/Product/Product';
import { UUID, Uuid } from '@Domain/Common/Libraries';

export class CreateBaskteUseCase {
  private _basket: Basket | null = null;

  get basket() {
    if ( this._basket === null ) throw new MethodNotExecutedException( 'Basket not created' );

    return this._basket;
  }

  execute(): Basket {
    if ( this._basket !== null ) return this._basket;
    this._basket = Basket.create();
    return this._basket;
  }
}

export class SaveBasketUseCase {
  private _basketCommandRepository: BasketCommandRepository;

  private _uuid: Uuid;

  constructor( uuid: Uuid, basketCommandRepository: BasketCommandRepository ) {
    this._basketCommandRepository = basketCommandRepository;
    this._uuid = uuid;
  }

  execute( basket: Basket ): Promise<Basket> {
    basket.id = this._uuid.generate();
    return this._basketCommandRepository.saveBasket( basket );
  }
}

export class GetBasketByIdUseCase {
  private _basketQueryRepository: BasketQueryRepository;

  constructor( basketQueryRepository: BasketQueryRepository ) {
    this._basketQueryRepository = basketQueryRepository;
  }

  async execute( basketId: UUID ): Promise<Basket> {
    const basket = await this._basketQueryRepository.getBasketById( basketId );

    if ( basket === null ) throw new NotFoundException();

    return basket;
  }
}

export class AddProductUseCase {
  private readonly _basket: Basket;

  private _product: Product | null = null;

  constructor( basket: Basket ) {
    this._basket = basket;
  }

  get latestsavedProduct(): Product {
    if ( this._product === null ) throw new MethodNotExecutedException();

    return this._product;
  }

  execute( product: ProductParams ): Basket {
    this._product = Product.create( product );
    this._basket.items.push( this._product );
    return this._basket;
  }
}

export class RemoveProductUseCase {
  private readonly _basket: Basket;

  constructor( basket: Basket ) {
    this._basket = basket;
  }

  execute( productId: UUID ): Basket {
    const removeProduct = ( product: Product ) => product.id !== productId;
    this._basket.items = this._basket.items.filter( removeProduct );
    return this._basket;
  }
}
