import { BadRequestHttpResponse } from '../models/index';
import { I18N } from '../i18n/index';

export class ArgumentRequiredException extends BadRequestHttpResponse {
  constructor ( argument: string ) {
    super( `${ argument } ${ I18N.EXCEPTIONS.ARGUMENT_REQUIRED }` );
  }
}

export class ProductNameValueNotValidException extends BadRequestHttpResponse {
  constructor () {
    super( I18N.EXCEPTIONS.PRODUCT_NAME_VALUE_NOT_VALID );
  }
}

export class SupermarketValueNotValidException extends BadRequestHttpResponse {
  constructor () {
    super( I18N.EXCEPTIONS.SUPERMARKET_VALUE_NOT_VALID );
  }
}
