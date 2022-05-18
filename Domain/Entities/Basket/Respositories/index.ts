import { Basket } from '@Domain/Entities/Basket/Basket';
import { UUID } from '@Domain/Common/Libraries';

export interface BasketQueryRepository {
  getBasketById( basketId: UUID ): Promise<Basket | null>;
}

export interface BasketCommandRepository {
  saveBasket( basket: Basket ): Promise<Basket>;
}
