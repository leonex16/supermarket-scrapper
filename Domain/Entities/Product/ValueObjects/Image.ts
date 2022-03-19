import { REGEX_URL } from '@Domain/Common/Constats';
import { EmptyValueException, RequiredParamException, UrlNotValidException } from '@Domain/Common/Exceptions';

interface ImageParams {
  image: string;
}

export class Image {
  private readonly _value: string;

  private constructor( { image }: ImageParams ) {
    this._value = image;
  }

  get value() {
    return this._value;
  }

  static create( { image }: ImageParams ) {
    const imageTrimmed = image?.trim();

    if ( imageTrimmed === undefined ) throw new RequiredParamException();
    if ( imageTrimmed === '' ) throw new EmptyValueException();
    if ( !REGEX_URL.test( imageTrimmed ) ) throw new UrlNotValidException();

    return new Image( { image: imageTrimmed } );
  }
}