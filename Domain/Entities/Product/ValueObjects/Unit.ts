export class Unit {
  private readonly _value: string;

  private constructor( unit: string ) {
    this._value = unit;
  }

  get value() {
    return this._value;
  }

  static create( unit: string ) {
    // TODO: Validate...
    return new Unit( unit );
  }
}