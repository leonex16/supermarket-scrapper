/* eslint-disable max-len */
import { SupermarketDoesNotSupport } from './errors';
import type { Supermarkets } from '../shared/types';
import { SupermarketSelector, SupermarketSelectors } from '../shared/interfaces';

export class Supermarket {
  private readonly SUPERMARKET_SELECTOR: SupermarketSelector = {
    LIDER: {
      NAME: 'Lider',
      URL: 'https://www.lider.cl/supermercado',
      URL_TO_SEARCH: 'https://www.lider.cl/supermercado/search?Ntt',
      SEARCH_BOX: 'input#searchtextinput',
      NOT_FOUND: '.no-search-results',
      ORDER_BY_PRICE: 'li#productsorderprice',
      PRODUCTS: 'div#content-prod-boxes > div[id^=\'productBox\']',
      PRODUCT: {
        ORIGIN: 'https://www.lider.cl',
        NAME: 'span.product-name',
        DESCRIPTION: 'span.product-description',
        DETAIL: {
          NORMAL_PRICE: 'span.price-sell b',
          BEST_PRICE: 'span.price-sell b',
          UNIT: 'span.product-attribute'
        },
        IMAGE: 'img.img-responsive',
        URL: '.product-tags ~ a.product-link'
      },
      BANNER: 'div.slider'
    },
    JUMBO: {
      NAME: 'Jumbo',
      URL: 'https://www.jumbo.cl/',
      URL_TO_SEARCH: 'https://www.jumbo.cl/busqueda?ft',
      SEARCH_BOX: 'input.new-header-search-input',
      NOT_FOUND: '.error-404-empty-message',
      PRODUCTS: 'ul.shelf-list > li.shelf-item',
      PRODUCT: {
        ORIGIN: 'https://www.jumbo.cl',
        NAME: 'h2.shelf-product-title-text',
        DESCRIPTION: 'h2.shelf-product-brand',
        DETAIL: {
          NORMAL_PRICE: ':is(.price-product-item.regular:not(.tcenco) span.price-best), .product-sigle-price-wrapper',
          BEST_PRICE: '.price-product-item.regular.promotion:not(.tcenco)',
          UNIT: 'span.shelf-single-unit'
        },
        IMAGE: 'div.lazy-image-wrap.loaded img.lazy-image',
        URL: 'a.shelf-wrap-image.not-logged'
      },
      BANNER: 'div.new-home-hero-slider'
    }
  };

  private readonly _supermarketSelectors: SupermarketSelectors;

  constructor ( supermarket: Supermarkets ) {
    this._supermarketSelectors = this.SUPERMARKET_SELECTOR[ supermarket.toUpperCase() ];

    if ( this._supermarketSelectors === undefined ) throw new SupermarketDoesNotSupport( supermarket );
  }

  getSelectors () {
    return this._supermarketSelectors;
  }
}
