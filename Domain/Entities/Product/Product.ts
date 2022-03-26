import { Entity } from '@Domain/Common/Entity';
import { UUID } from '@Domain/Common/Libraries';

import { Detail } from './Assigments/Detail';
import {
  Description,
  Image,
  Name,
  Source
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
  description: string;
  detail: {
    normalPrice: string,
    bestPrice: string,
    unit: string,
  };
  image: string;
  source: string;
}

export class Product extends Entity {
  
  public readonly name: Name;

  public readonly description: Description;

  public readonly detail: Detail;

  public readonly image: Image;

  public readonly source: Source;

  private constructor( product: ProductConstructor ) {
    super( product.id );
    this.name = product.name;
    this.description = product.description;
    this.detail = product.detail;
    this.image = product.image;
    this.source = product.source;
  }


  get id(): string {
    return this._id;
  }

  static create( product: ProductParams ): Product {
    const buildingProduct: ProductConstructor  = {
      id: product.id,
      name: Name.create( product ),
      description: Description.create( product ),
      detail: Detail.create( product.detail ),
      image: Image.create( product ),
      source: Source.create( product ),
    };

    return new Product( buildingProduct );
  }

  static parse( product: Product ): Product {
    return new Product( product );
  }

}