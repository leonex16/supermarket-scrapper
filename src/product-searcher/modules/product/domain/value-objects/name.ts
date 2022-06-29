import {
  EmptyValueException, StrTooLargeException, StrTooShortException
} from '../errors';

export class Name {
  private _value: string;

  private constructor ( name: string ) {
    this._value = this._toCapitalizeCase( name );
  }

  get value () {
    return this._value;
  }

  static create ( name = '' ) {
    const nameTrimmed = name.trim();

    if ( nameTrimmed === '' ) throw new EmptyValueException( 'name' );
    if ( nameTrimmed.length < 2 ) throw new StrTooShortException( 'name' );
    if ( nameTrimmed.length > 50 ) throw new StrTooLargeException( 'name' );

    return new Name( nameTrimmed );
  }

  private _toCapitalizeCase = ( str?: string ) => {
    return ( str === undefined )
      ? ''
      : str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase();
  };
}
