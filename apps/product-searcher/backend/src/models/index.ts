import { I18N } from '../i18n/index';
import { STATUS_CODES } from '../constants/index';

export abstract class HttpResponse<T = null> {
  protected _isOk = false;

  protected _data: T | null = null;

  protected _message = I18N.STATUS_CODES[ STATUS_CODES.INTERNAL_ERROR ];

  public status: STATUS_CODES;

  constructor ( data: T | null, statusCode: STATUS_CODES ) {
    this._isOk = statusCode >= 200 && statusCode < 300;
    this._data = data;
    this._message = I18N.STATUS_CODES[ statusCode ];
    this.status = statusCode;
  }

  toJson () {
    return {
      isOk: this._isOk,
      data: this._data,
      message: this._message
    };
  }
}

export class InternalServerHttpResponse extends HttpResponse {
  constructor () {
    super( null, STATUS_CODES.INTERNAL_ERROR );
  }
}

export class NotFoundHttpResponse extends HttpResponse {
  constructor ( customMessage?: string ) {
    super( null, STATUS_CODES.NOT_FOUND );
    this._message = `${ this._message } >> ${ customMessage }`;
  }
}

export class BadRequestHttpResponse extends HttpResponse {
  constructor ( customMessage?: string ) {
    super( null, STATUS_CODES.BAD_REQUEST );
    this._message = `${ this._message } >> ${ customMessage }`;
  }
}

export class NoContentHttpResponse extends HttpResponse {
  constructor () {
    super( null, STATUS_CODES.NO_CONTENT );
  }
}

export class OkHttpResponse<T> extends HttpResponse<T> {
  constructor ( data: T ) {
    super( data, STATUS_CODES.OK );
  }
}
