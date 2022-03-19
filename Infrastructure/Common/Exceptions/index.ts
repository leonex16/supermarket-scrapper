import { CustomErrorProps } from '@Infrastructure/Common/Types';

export class NotFoundException extends Error {
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'No encontrado';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'NotFound';
  }
}
