import { Entity } from '../../Common/Entity';
import { Product } from '../Product/Product';

// import { Entity } from '@Common/Entity';
// import { Product } from '@Entities/Product/Product';

interface BasketProps {
  id: string;
  items: Product[]
}
export class Basket extends Entity {
  public items: Product[];

  private constructor( { id, items }: BasketProps ) {
    super( id );
    this.items = items;
  }

  get id(): string {
    return this._id;
  }

  static create( { id, items }: BasketProps ): Basket {
    return new Basket( { id, items } );
  }
}