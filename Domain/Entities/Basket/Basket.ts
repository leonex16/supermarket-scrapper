import { Entity } from "@Common/Entity";
// import { UUID } from '@Common/Gateways/UUID';
import { findByIdAndRemove } from "@Common/functions/findByIdAndRemove";

import { Product } from "@Entities/Product/Product";

export class Basket extends Entity {
  private _items: Product[] = []

  // constructor( uuid: UUID ) {
  //   super( uuid );
  // }

  public add( product: Product ) {
    this._items.push( product );
  }

  public remove( productId: string ) {
    this._items = findByIdAndRemove( this._items, productId );

    return this
  }

}