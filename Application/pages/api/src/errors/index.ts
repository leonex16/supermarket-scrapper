import { ErrorHttp } from '@server/models/index';
import { I18N } from '@server/i18n/index';
import { STATUS_CODES } from '@server/constants/index';

export class ArgumentRequiredException extends ErrorHttp {
  constructor( argument: string ) {
    super( STATUS_CODES.NOT_VALID, `${ argument } ${ I18N.EXCEPTIONS.ARGUMENT_REQUIRED }` );
  }
}
