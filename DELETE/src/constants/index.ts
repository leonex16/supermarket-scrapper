import { SupermarketSelector } from '#src/interfaces/index';

export const SUPERMARKET_SELECTORS: SupermarketSelector = {
  LIDER: {
    URL: 'https://www.lider.cl/supermercado/',
    SEARCH_BOX: 'input#searchtextinput',
    NOT_FOUND: '.no-search-results',
    ORDER_BY_PRICE: 'li#productsorderprice',
    PRODUCTS: 'div#content-prod-boxes > div[id^=\'productBox\']',
    PRODUCT: {
      NAME: 'span.product-name',
      DESCRIPTION: 'span.product-description',
      DETAIL: {
        NORMAL_PRICE: 'span.price-sell b',
        BEST_PRICE: 'span.price-sell b',
        UNIT: 'span.product-attribute',
      },
      IMAGE: 'img.img-responsive',
      URL: 'a.product-link',
    },
  },
  JUMBO: {
    URL: 'https://www.jumbo.cl/',
    SEARCH_BOX: 'input.new-header-search-input',
    NOT_FOUND: '.error-404-empty-message',
    PRODUCTS: 'ul.shelf-list > li.shelf-item',
    PRODUCT: {
      NAME: 'h2.shelf-product-title-text',
      DESCRIPTION: 'h2.shelf-product-brand',
      DETAIL: {
        NORMAL_PRICE: 'span.product-sigle-price-wrapper',
        BEST_PRICE: 'span.price-best',
        UNIT: 'span.shelf-single-unit',
      },
      IMAGE: 'div.lazy-image-wrap.loaded > img.lazy-image',
      URL: 'a.shelf-wrap-image.not-logged',
    },
  },
};

export const DEFAULT_IMG = 'https://dummyimage.com/600x400/000/fff';

export const STATUS_CODES = {
  NOT_VALID: 400,
  NOT_FOUND: 404,
  OK: 200,
  INTERNAL_ERROR: 500,
};
