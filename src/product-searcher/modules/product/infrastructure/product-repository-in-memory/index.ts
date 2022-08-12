import { Product } from '../../domain/product';
import { ProductRepository } from '../../domain/product-repository';

export class ProductRepositoryInMemory implements ProductRepository {
  constructor (
    private _storage: Product[] = []
  ) {}

  async save ( product: Product ) {
    this._storage.push( product );
  }

  async get ( id: string ) {
    return this._storage.find( product => product.id === id ) ?? null;
  }
}
