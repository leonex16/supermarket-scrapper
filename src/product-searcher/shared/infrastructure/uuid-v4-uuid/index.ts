import { v4, validate } from 'uuid';

import { UUIDV4 } from '../../domain/uuid';

export class UUID implements UUIDV4 {
  generate (): string {
    return v4();
  }

  validate ( uuid: string ): boolean {
    return validate( uuid );
  }
}
