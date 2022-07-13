import { EmptyValueException, UrlNotValidException } from '../errors';

export class Source {
  private readonly _value: string;
  private static readonly REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  private constructor ( source: string ) {
    this._value = source;
  }

  get value () {
    return this._value;
  }

  static create ( source = '' ) {
    const sourceTrimmed = source?.trim();

    if ( sourceTrimmed === '' ) throw new EmptyValueException( 'source' );
    if ( !this.REGEX_URL.test( sourceTrimmed ) ) throw new UrlNotValidException( 'source' );

    return new Source( sourceTrimmed );
  }
}
