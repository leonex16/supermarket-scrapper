import { v4 as uuidv4 } from 'uuid';

// import { UUID } from '@Domain/Libraries/index';

import { UUID } from '../../Domain/Common/Libraries';

export const UUIDImplementation: UUID = {
  generate(): string {
    return uuidv4();
  }
};