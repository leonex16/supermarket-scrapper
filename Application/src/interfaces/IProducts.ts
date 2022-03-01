export interface PlaywrightResponse {
    products: Product[];
    timer:    Timer;
}

export interface Detail {
    normalPrice: string;
    bestPrice: string;
    unit: string;
}

export interface Product {
    name:        string;
    description: string;
    detail: Detail;
    image: string;
    url: string;
}

export interface Timer {
    name:      string;
    InMs:      number;
    InSeconds: string;
}