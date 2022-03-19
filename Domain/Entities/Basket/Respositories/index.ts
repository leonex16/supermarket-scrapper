import { Basket } from '@Domain/Entities/Basket/Basket';
import { ProductParams } from '@Domain/Entities/Product/Product';
export interface BasketQueryRepository {
  getBasket( basketId: string ): Promise<Basket | null>;
}

export interface BasketCommandRepository {
  saveBasket(): Promise<Basket>;
  saveProduct( product: ProductParams ): Basket;
  removeProduct( productId: string ): Basket;
}