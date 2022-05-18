export class Price {
  private readonly _value: string | null;

  private constructor( price = '' ) {
    this._value = price === '' ? null : price;
  }

  get value() {
    return this._value;
  }

  static create( price?: string ) {
    return new Price( price );
  }
}
