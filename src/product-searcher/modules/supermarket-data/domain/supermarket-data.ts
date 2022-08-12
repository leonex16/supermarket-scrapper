export interface ProductSelectors {
  origin: string;
  name: string;
  description: string;
  normalPrice: string;
  bestPrice: string;
  unit: string;
  image: string;
  url: string;
}

export interface SupermarketData {
  get name(): string;
  get urlToGo(): string;
  get urlToSearch(): string;
  get notFoundProductSelector(): string;
  get orderByPriceSelector(): string;
  get productsSelector(): string;
  get productSelector(): ProductSelectors;
  get bannerSelector(): string;
}
