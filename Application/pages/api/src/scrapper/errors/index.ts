import { ErrorHttp } from '@server/models/index';
import { I18N } from '@server/i18n/index';
import { STATUS_CODES } from '@server/constants/index';

export class ProductNameValueNotValidException extends ErrorHttp {
  constructor() {
    super( STATUS_CODES.NOT_VALID, I18N.EXCEPTIONS.PRODUCT_NAME_VALUE_NOT_VALID );
  }
}

export class SupermarketValueNotValidException extends ErrorHttp {
  constructor() {
    super( STATUS_CODES.NOT_VALID, I18N.EXCEPTIONS.SUPERMARKET_VALUE_NOT_VALID );
  }
}

export class NotFoundProductException extends ErrorHttp {
  constructor() {
    super( STATUS_CODES.NOT_FOUND, I18N.EXCEPTIONS.PRODUCT_NOT_FOUND );
  }
}
