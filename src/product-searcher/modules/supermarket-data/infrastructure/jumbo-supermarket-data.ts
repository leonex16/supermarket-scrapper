import { SupermarketData } from '../domain/supermarket-data';

export class JumboSupermarketData implements SupermarketData {
  get name (): string {
    return 'Jumbo';
  }

  get urlToGo (): string {
    return 'https://www.jumbo.cl/';
  }

  get urlToSearch (): string {
    return 'https://www.jumbo.cl/busqueda?ft';
  }

  get notFoundProductSelector (): string {
    return '.error-404-empty-message';
  }

  get orderByPriceSelector (): string {
    return '';
  }

  get productsSelector (): string {
    return 'ul.shelf-list > li.shelf-item';
  }

  get productSelector () {
    return {
      origin: 'https://www.jumbo.cl',
      name: 'h2.shelf-product-title-text',
      description: 'h2.shelf-product-brand',
      normalPrice: ':is(.price-product-item.regular:not(.tcenco) span.price-best), .product-sigle-price-wrapper',
      bestPrice: '.price-product-item.regular.promotion:not(.tcenco)',
      unit: 'span.shelf-single-unit',
      image: 'div.lazy-image-wrap.loaded img.lazy-image',
      url: 'a.shelf-wrap-image.not-logged'
    };
  }

  get bannerSelector (): string {
    return 'div.new-home-hero-slider';
  }
}
