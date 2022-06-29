import { UrlNotValidException } from '../errors';

export class Image {
  private readonly _value: string;
  private static readonly DEFAULT_IMG = 'https://dummyimage.com/600x400/000/fff';
  private static readonly REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  private constructor ( image: string ) {
    this._value = image;
  }

  get value () {
    return this._value;
  }

  static create ( image = '' ) {
    const imageTrimmed = image.trim();

    if ( imageTrimmed === '' ) return new Image( this.DEFAULT_IMG );
    if ( !this.REGEX_URL.test( imageTrimmed ) ) throw new UrlNotValidException( 'image' );

    return new Image( imageTrimmed );
  }
}
