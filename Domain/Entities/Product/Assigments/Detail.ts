import { Price, Unit } from '../ValueObjects/index';
// import { Price, Unit } from '@Entities/Product/ValueObjects/_index';

interface DetailContructor {
  normalPrice: Price;
  bestPrice: Price;
  unit: Unit;
}

interface DetailParams {
  normalPrice: string;
  bestPrice: string;
  unit: string;
}

export class Detail {
  private readonly _normalPrice: Price;

  private readonly _bestPrice: Price;

  private readonly _unit: Unit;

  private constructor( { normalPrice, bestPrice, unit }: DetailContructor ) {
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

  static create( detail: DetailParams ) {
    const normalPrice = Price.create( detail.normalPrice );
    const bestPrice = Price.create( detail.bestPrice );
    const unit = Unit.create( detail.unit );

    return new Detail( { normalPrice, bestPrice, unit } );
  }
}