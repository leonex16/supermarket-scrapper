/* eslint-disable sort-imports */
import { Detail } from './assigments/Detail';
import {
  Description,
  Id,
  Image,
  Name,
  Source
} from './value-objects';

export class Product {
  constructor (
    private readonly _id: Id,
    private readonly _name: Name,
    private readonly _description: Description,
    private readonly _detail: Detail,
    private readonly _image: Image,
    private readonly _source: Source
  ) {}

  get id () {
    return this._id.value;
  }

  get name () {
    return this._name.value;
  }

  get description () {
    return this._description.value;
  }

  get detail () {
    return {
      bestPrice: this._detail.bestPrice,
      normalPrice: this._detail.normalPrice,
      unit: this._detail.unit
    };
  }

  get image () {
    return this._image.value;
  }

  get source () {
    return this._source.value;
  }

  static create ( rawProduct: any ) {
    if ( rawProduct === undefined ) throw new Error( 'Product argument is required' );

    // Fix or format product info values
    const productInfo = {
      id: new Id( '' ),
      name: Name.create( rawProduct.name ),
      description: Description.create( rawProduct.description ),
      detail: Detail.create( rawProduct.normalPrice, rawProduct.bestPrice, rawProduct.unit ),
      image: Image.create( rawProduct.image ),
      source: Source.create( rawProduct.source )
    };

    return new Product(
      productInfo.id,
      productInfo.name,
      productInfo.description,
      productInfo.detail,
      productInfo.image,
      productInfo.source
    );
  }
}
