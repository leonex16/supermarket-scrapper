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

    if ( sourceTrimmed === undefined ) throw new RequiredParamException( 'source' );
    if ( sourceTrimmed === '' ) throw new EmptyValueException( 'source' );
    if ( !REGEX_URL.test( sourceTrimmed ) ) throw new UrlNotValidException( 'source' );

    return new Source( { source } );
  }
}