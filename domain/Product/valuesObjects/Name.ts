import { StrTooShort } from '@Common/exceptions/StrTooShort'
import { StrTooLarge } from '@Common/exceptions/StrTooLarge'

export class Name {
  private _value: string;

  private constructor( name: string ) {
    this._value = name;
  }

  get value() {
    return this._value;
  }

  static create ( name: string ) {
    let returnedValue = null;

    try {
      if ( name.length < 2 ) throw new StrTooShort();
      if ( name.length > 25 ) throw new StrTooLarge();

      returnedValue = new Name( name );

    } catch ( error ) {
      console.error( error );
    }

    return returnedValue;
  }
}