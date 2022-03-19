import { REGEX_URL } from '@Domain/Common/Constats';
import { EmptyValueException, RequiredParamException, UrlNotValidException } from '@Domain/Common/Exceptions';

interface SourceParams {
  source: string;
}

export class Source {
  private readonly _value: string;

  private constructor( { source }: SourceParams ) {
    this._value = source;
  }

  get value() {
    return this._value;
  }

  static create( { source }: SourceParams ) {
    const sourceTrimmed = source?.trim();

    if ( sourceTrimmed === undefined ) throw new RequiredParamException();
    if ( sourceTrimmed === '' ) throw new EmptyValueException();
    if ( !REGEX_URL.test( sourceTrimmed ) ) throw new UrlNotValidException();

    return new Source( { source } );
  }
}