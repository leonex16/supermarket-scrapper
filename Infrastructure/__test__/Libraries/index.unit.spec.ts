import { UUIDImplementation } from '../../Libraries/index';

describe( 'UUID implementation with uuid library', () => {
  describe( 'Generate method', () => {
    it( 'Should generate a uuid', () => {
      const uuid = new UUIDImplementation();
      const uuidGenerated = uuid.generate();

      expect( uuidGenerated ).toBeDefined();
      expect( uuidGenerated ).toHaveLength( 36 );
    } );
  } );

  describe( 'Validate method', () => {
    it( 'Should return true with a uuid v4 valid', () => {
      const uuid = new UUIDImplementation();
      const uuidGenerated = uuid.generate();

      expect( uuid.validate( uuidGenerated ) ).toBe( true );
    } );

    it( 'Should return false with a uuid v4 valid', () => {
      const uuid = new UUIDImplementation();

      expect( uuid.validate( 'uuidGenerated' ) ).toBe( false );
    } );
  } );
} );
