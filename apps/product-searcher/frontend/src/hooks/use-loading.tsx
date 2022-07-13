import { useContext } from 'react';

import { StateContext } from '../contexts';

export const useLoading = () => {
  const stateContext = useContext( StateContext );

  if ( stateContext === null ) throw new Error( 'StateContext should be initialize' );

  return { isLoading: stateContext.isFetchingData, setLoading: stateContext.setIsFetchingData };
};
