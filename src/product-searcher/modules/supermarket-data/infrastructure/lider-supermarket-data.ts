import { SupermarketData } from '../domain/supermarket-data';

export class LiderSupermarketData implements SupermarketData {
  get name (): string {
    return 'Lider';
  }

  get urlToGo (): string {
    return 'https://www.lider.cl/supermercado';
  }

  get urlToSearch (): string {
    return 'https://www.lider.cl/supermercado/search?Ntt';
  }

  get notFoundProductSelector (): string {
    return '.no-search-results';
  }

  get orderByPriceSelector (): string {
    return 'li#productsorderprice';
  }

  get productsSelector (): string {
    return 'div#content-prod-boxes > div[id^=\'productBox\']';
  }

  get productSelector () {
    return {
      origin: 'https://www.lider.cl',
      name: 'span.product-name',
      description: 'span.product-description',
      normalPrice: 'span.price-sell b',
      bestPrice: 'span.price-sell b',
      unit: 'span.product-attribute',
      image: 'img.img-responsive',
      url: '.product-tags ~ a.product-link'
    };
  }

  get bannerSelector (): string {
    return 'div.slider';
  }
}
