import { Entity } from '@Common/Entity';
import { UUID } from '@Common/Gateways/UUID';

import {
  Description,
  Detail,
  Image,
  Name,
  Source
} from './ValuesObjects/_index';

interface ProductParams {
  name: Name;
  description: Description;
  detail: Detail;
  image: Image;
  source: Source;
}

export class Product extends Entity {
    
  private _name: Name;

  private _description: Description;

  private _detail: Detail;

  private _image: Image;

  private _source: Source;

  constructor(UUID: UUID, product: ProductParams) {
    super(UUID);
    this._name = product.name;
    this._description = product.description;
    this._detail = product.detail;
    this._image = product.image;
    this._source = product.source;
  }

}