import { Detail } from '../../domain/assigments/Detail';
import { Product } from '../../domain/product';
import { ProductRepository } from '../../domain/product-repository';
import {
  Description,
  Id,
  Image,
  Name,
  Source
} from '../../domain/value-objects';

export class ProductCreator {
  constructor (
    private readonly _productRepository: ProductRepository
  ) {}

  public async run (
    id: Id,
    name: Name,
    description: Description,
    detail: Detail,
    image: Image,
    source: Source
  ) {
    const product = new Product( id, name, description, detail, image, source );

    await this._productRepository.save( product );
  }
}
