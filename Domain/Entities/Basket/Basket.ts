import { Entity } from '@Domain/Common/Entity';
import { Product } from '@Domain/Entities/Product/Product';
import { UUID } from '@Domain/Common/Libraries';

interface BasketConstructor{
  id: UUID;
  items: Product[]
}

interface BasketProps {
  id: string;
  items: Product[]
}
export class Basket extends Entity {
  public items: Product[];

  private constructor( { id, items }: BasketConstructor ) {
    super( id );
    this.items = items;
  }

  get id(): UUID {
    return this._id;
  }

  set id( id: UUID ) {
    this._id = id;
  }

  static create( basketProps?: BasketProps ): Basket {
    return new Basket( basketProps ?? { id: '', items: [] } );
  }
}
