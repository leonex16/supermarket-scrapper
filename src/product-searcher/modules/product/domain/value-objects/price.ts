export class Price {
  private readonly _value: string | null;

  private constructor ( price: string ) {
    this._value = this._satizeAndFormatCLPCurrency( price );
  }

  get value () {
    return this._value;
  }

  static create ( price = '' ) {
    return new Price( price );
  }

  private _formatToCLPCurrency = ( value = '' ) => {
    const valueTrimmed = value.trim();

    return new Intl
      .NumberFormat( 'es-CL', { style: 'currency', currency: 'CLP' } )
      .format( Number( valueTrimmed === '' ? 0 : Number( valueTrimmed ) ) );
  };

  private _sanitizedCLPCurrency = ( value = '' ) => {
    const cleanedValue = value.replace( /[^0-9]/g, '' );
    const isNotNumber = Number.isInteger( Number( cleanedValue ) ) === false;

    if ( isNotNumber ) return '0';

    return cleanedValue;
  };

  private _satizeAndFormatCLPCurrency = ( value: string ) => {
    return value === ''
      ? null
      : this._formatToCLPCurrency( this._sanitizedCLPCurrency( value ) );
  };
}
