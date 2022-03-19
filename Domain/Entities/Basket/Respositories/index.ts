import { Basket } from '../Basket';
import { ProductParams } from '../../Product/Product';

// import { Basket } from '@Entities/Basket/Basket';
// import { Product } from '@Entities/Product/Product';

export interface BasketQueryRepository {
  getBasket( basketId: string ): Promise<Basket | null>;
}

export interface BasketCommandRepository {
  saveBasket(): Promise<Basket>;
  saveProduct( product: ProductParams ): Basket;
  removeProduct( productId: string ): Basket;
}