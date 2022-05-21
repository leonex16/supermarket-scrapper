/* eslint-disable class-methods-use-this */
import { v4, validate } from 'uuid';

import { UUID, Uuid } from '@Domain/Common/Libraries/index';

export class UUIDImplementation implements Uuid {
  generate(): UUID {
    return v4();
  }

  validate( id: string ): boolean {
    return validate( id );
  }
}
