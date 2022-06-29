export interface Options {
  randUndefined?: boolean;
}

export interface GeneratorData {
  randProductName: ( opts?: Options ) => string | undefined;
  randProductDescription: ( opts?: Options ) => string | undefined;
  randProductPrice: ( opts?: Options ) => string | undefined;
  randProductUnit: ( opts?: Options ) => string | undefined;
  randImg: ( opts?: Options ) => string | undefined;
  randUrl: ( opts?: Options ) => string | undefined;
}
