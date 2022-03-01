import { StrTooShort } from '@Common/Exceptions/StrTooShort'
import { StrTooLarge } from '@Common/Exceptions/StrTooLarge'

interface NameParams {
  name: string
}
export class Name {
  private _value: string;

  private constructor( {name}: NameParams ) {
    this._value = name;
  }

  get value() {
    return this._value;
  }

  static create ( {name}: NameParams ) {
    let returnedValue = null;

    try {
      if ( name.length < 2 ) throw new StrTooShort();
      if ( name.length > 25 ) throw new StrTooLarge();

      returnedValue = new Name( {name} );

    } catch ( error ) {
      console.error( error );
    }

    return returnedValue;
  }
}