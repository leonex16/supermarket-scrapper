export class Price {
  private readonly _value: string;

  private constructor( price: string ) {
    this._value = price;
  }

  get value() {
    return this._value;
  }

  static create( price: string ) {
    // TODO: Validate...
    return new Price( price );
  }
}