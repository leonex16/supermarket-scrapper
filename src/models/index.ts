import { STATUS_CODES } from '#src/constants/index';
import { I18N, StatusCodes } from '#src/i18n/index';

export class ErrorHttp extends Error {
  statusCode: number;

  message: string;

  constructor( statusCode: number, message: string ) {
    super( message );
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class ResponseHttp {
  public isOk = false;

  public statusCode = 500;

  public data: any = undefined;

  public message = I18N.STATUS_CODES[ 500 ];

  handleSuccess( data: any ) {
    const statusCode = STATUS_CODES.OK as StatusCodes;
    this.isOk = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = I18N.STATUS_CODES[ statusCode ];
  }

  handleError( error: ErrorHttp ) {
    const statusCode = ( error.statusCode ?? STATUS_CODES.INTERNAL_ERROR )as StatusCodes;
    this.isOk = false;
    this.statusCode = error.statusCode ?? statusCode;
    this.message = error.message ?? I18N.STATUS_CODES[ statusCode ];
  }

  toJSON(): any {
    return {
      isOk: this.isOk,
      data: this.data,
      message: this.message,
    };
  }
}
