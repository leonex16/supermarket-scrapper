export const findByIdAndRemove = <T>( items: T[], id: string ): T[] => {
  const copy = [ ...items ] as any[];

  for( let i = 0; i < copy.length; i++ ) {
    if( copy[ i ][ id ] === id ) {
      copy.splice( i, 1 );
      break;
    }
  }

  return copy as T[];
}