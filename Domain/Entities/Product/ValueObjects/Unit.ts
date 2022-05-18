import { EmptyValueException, RequiredParamException } from '@Domain/Common/Exceptions';

export class Unit {
  private readonly _value: string;

  private constructor( unit: string ) {
    this._value = unit;
  }

  get value() {
    return this._value;
  }

  static create( unit: string ) {
    const trimmedUnit = unit?.trim();

    if ( trimmedUnit === undefined ) throw new RequiredParamException( 'unit' );
    if ( trimmedUnit === '' ) throw new EmptyValueException( 'unit' );

    return new Unit( unit );
  }
}
