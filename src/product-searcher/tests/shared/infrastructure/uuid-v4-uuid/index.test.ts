import { expect, test } from '@playwright/test';

import { UUID } from '../../../../shared/infrastructure/uuid-v4-uuid';

test.describe( 'UUID ( uuid library )', () => {
  test.describe( 'Generate method', () => {
    test( 'Should generate a uuid', () => {
      const uuid = new UUID();
      const uuidGenerated = uuid.generate();

      expect( uuidGenerated ).toBeDefined();
      expect( uuidGenerated ).toHaveLength( 36 );
    } );
  } );

  test.describe( 'Validate method', () => {
    test( 'Should return true with a uuid v4 valid', () => {
      const uuid = new UUID();
      const uuidGenerated = uuid.generate();

      expect( uuid.validate( uuidGenerated ) ).toBe( true );
    } );

    test( 'Should return false with a uuid v4 valid', () => {
      const uuid = new UUID();

      expect( uuid.validate( 'uuidGenerated' ) ).toBe( false );
    } );
  } );
} );
