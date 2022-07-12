export interface ProductSelectors {
  ORIGIN: string;
  NAME: string;
  DESCRIPTION: string;
  DETAIL: {
    NORMAL_PRICE: string;
    BEST_PRICE: string;
    UNIT: string;
  };
  IMAGE: string;
  URL: string;
}

// export interface RawProduct {
//   name?: string;
//   description?: string;
//   detail?: {
//     normalPrice?: string;
//     bestPrice?: string;
//     unit?: string;
//   };
//   image?: string;
//   url?: string;
// }

export interface SupermarketSelectors {
  NAME: string;
  URL: string;
  URL_TO_SEARCH: string;
  SEARCH_BOX: string;
  NOT_FOUND: string;
  ORDER_BY_PRICE?: string;
  PRODUCTS: string;
  PRODUCT: ProductSelectors;
  BANNER: string;
}

export interface SupermarketSelector {
  [key: string]: SupermarketSelectors;
}

// export interface Options {
//   randUndefined?: boolean;
// }

// export interface GeneratorData {
//   randProductName: ( opts?: Options ) => string | undefined;
//   randProductDescription: ( opts?: Options ) => string | undefined;
//   randProductPrice: ( opts?: Options ) => string | undefined;
//   randProductUnit: ( opts?: Options ) => string | undefined;
//   randImg: ( opts?: Options ) => string | undefined;
//   randUrl: ( opts?: Options ) => string | undefined;
// }
