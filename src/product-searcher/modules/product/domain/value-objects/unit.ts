import { EmptyValueException } from '../errors';

export class Unit {
  private readonly _value: string;

  private constructor ( unit: string ) {
    this._value = unit;
  }

  get value () {
    return this._value;
  }

  static create ( unit = '' ) {
    const trimmedUnit = unit.trim();

    if ( trimmedUnit === '' ) throw new EmptyValueException( 'unit' );

    return new Unit( unit );
  }
}
