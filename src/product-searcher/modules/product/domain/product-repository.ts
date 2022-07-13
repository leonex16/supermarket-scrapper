import { Product } from './product';

export interface ProductRepository {
  save( product: Product ): Promise<void>;
  get( id: string ): Promise<Product | null>;
}
