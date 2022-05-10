import { DEFAULT_IMG } from '@server/constants/index';
import { RawProduct } from '@server/interfaces';
import { satizeAndFormatCLPCurrency, toCapitalizeCase } from '@server/functions/index';

interface ProductConstructor {
  name: string;
  description: string | undefined;
  normalPrice: string;
  bestPrice: string;
  unit: string;
  image: string;
  url: string | undefined;
}

export class Product {
  name: string;

  description?: string;

  normalPrice: string;

  bestPrice?: string;

  unit: string;

  image: string;

  url?: string;

  private constructor( productInfo: ProductConstructor ) {
    this.name = productInfo.name;
    this.description = productInfo.description;
    this.normalPrice = productInfo.normalPrice;
    this.bestPrice = productInfo.bestPrice;
    this.unit = productInfo.unit;
    this.image = productInfo.image;
    this.url = productInfo.url;
  }

  static create( product: RawProduct ): Product | undefined {
    if ( product === undefined ) throw new Error( 'Product argument is required' );

    const productNameNotValid = product.name === undefined || product.name === '';
    const productPriceNotValid = product.detail?.normalPrice === undefined || product.detail?.normalPrice === '';
    const productUrlNotValid = product.url === undefined || product.url === '';
    const returnUndefined = productNameNotValid || productPriceNotValid || productUrlNotValid;

    if ( returnUndefined ) return undefined;

    const productInfo = {} as any;

    // Fix or format product info values
    productInfo.name = toCapitalizeCase( product.name );
    productInfo.description = product?.description?.trim();
    productInfo.normalPrice = satizeAndFormatCLPCurrency( product?.detail?.normalPrice );
    productInfo.bestPrice = product?.detail?.bestPrice && satizeAndFormatCLPCurrency( product?.detail?.bestPrice );
    productInfo.unit = product?.detail?.unit ?? undefined;
    productInfo.image = product.image ?? DEFAULT_IMG;
    productInfo.url = product.url;

    return new Product( productInfo );
  }
}
