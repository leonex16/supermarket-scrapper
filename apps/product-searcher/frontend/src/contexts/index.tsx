// https://www.freecodecamp.org/news/a-better-way-to-structure-react-projects/
import React from 'react';

interface StateContextProps {
  isFetchingData: boolean;
  setIsFetchingData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = React.createContext<StateContextProps | null>( null );
