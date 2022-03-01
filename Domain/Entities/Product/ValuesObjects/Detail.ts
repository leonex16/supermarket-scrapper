interface DetailParams {
  normalPrice: string;
  bestPrice: string;
  unit: string;
}

export class Detail {
  private _normalPrice: string;
  private _bestPrice: string;
  private _unit: string;

  private constructor({normalPrice, bestPrice, unit}: DetailParams) {
    this._normalPrice = normalPrice;
    this._bestPrice = bestPrice;
    this._unit = unit;
  }

  get detail() {
    return {
      normalPrice: this._normalPrice,
      bestPrice: this._bestPrice,
      unit: this._unit
    };
  }

  static create({normalPrice, bestPrice, unit}: DetailParams) {
    let returnedValue = null;

    try {
      // TODO: Validate...
      returnedValue = new Detail({normalPrice, bestPrice, unit});
    } catch (error) {
      console.error(error);
    }

    return returnedValue;
  }
}