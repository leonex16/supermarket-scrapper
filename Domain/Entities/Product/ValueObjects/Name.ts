import { EmptyValueException,RequiredParamException,StrTooLargeException, StrTooShortException } from '@Domain/Common/Exceptions';

interface NameParams {
  name: string
}
export class Name {
  private _value: string;

  private constructor( { name }: NameParams ) {
    this._value = name;
  }

  get value() {
    return this._value;
  }

  static create ( { name }: NameParams ) {
    const nameTrimmed = name?.trim();

    if ( nameTrimmed === undefined ) throw new RequiredParamException();
    if ( nameTrimmed === '' ) throw new EmptyValueException();
    if ( name.length < 2 ) throw new StrTooShortException();
    if ( name.length > 25 ) throw new StrTooLargeException();

    return new Name( { name } );
  }
}