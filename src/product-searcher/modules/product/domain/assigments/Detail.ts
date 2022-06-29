import { Price, Unit } from '../value-objects';

export class Detail {
  private readonly _normalPrice: string | null;

  private readonly _bestPrice: string | null;

  private readonly _unit: string;

  private constructor ( normalPrice: Price, bestPrice: Price, unit: Unit ) {
    this._normalPrice = normalPrice.value;
    this._bestPrice = bestPrice.value;
    this._unit = unit.value;
  }

  get normalPrice () {
    return this._normalPrice;
  }

  get bestPrice () {
    return this._bestPrice;
  }

  get unit () {
    return this._unit;
  }

  static create ( normalPrice = '', bestPrice = '', unit = '' ) {
    return new Detail(
      Price.create( normalPrice ),
      Price.create( bestPrice ),
      Unit.create( unit )
    );
  }
}
