/* eslint-disable sort-imports */
import { Entity } from '@Domain/Common/Entity';
import { UUID } from '@Domain/Common/Libraries';
import { Detail } from './Assigments/Detail';
import {
  Description,
  Image,
  Name,
  Source,
} from './ValueObjects';

interface ProductConstructor{
  id: UUID;
  name: Name;
  description: Description;
  detail: Detail;
  image: Image;
  source: Source;
}

export interface ProductParams {
  id: string;
  name: string;
  description?: string;
  detail: {
    normalPrice?: string,
    bestPrice?: string,
    unit: string,
  };
  image: string;
  source: string;
}

export class Product extends Entity {
  private readonly _name: Name;

  private readonly _description: Description;

  private readonly _detail: Detail;

  private readonly _image: Image;

  private readonly _source: Source;

  private constructor( product: ProductConstructor ) {
    super( product.id );
    this._name = product.name;
    this._description = product.description;
    this._detail = product.detail;
    this._image = product.image;
    this._source = product.source;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get description(): string | null {
    return this._description.value;
  }

  get detail(): {
    normalPrice: string | null,
    bestPrice: string | null,
    unit: string,
  } {
    return {
      normalPrice: this._detail.normalPrice.value,
      bestPrice: this._detail.bestPrice.value,
      unit: this._detail.unit.value,
    };
  }

  get image(): string {
    return this._image.value;
  }

  get source(): string {
    return this._source.value;
  }

  static create( product: ProductParams ): Product {
    const buildingProduct: ProductConstructor = {
      id: product.id,
      name: Name.create( product ),
      description: Description.create( product ),
      detail: Detail.create( product.detail ),
      image: Image.create( product ),
      source: Source.create( product ),
    };

    return new Product( buildingProduct );
  }
}
