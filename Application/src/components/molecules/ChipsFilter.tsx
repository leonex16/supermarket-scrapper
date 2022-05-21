import React, { useState } from 'react';

import styles from '@Application/styles/molecules/ChipsFilter.module.scss';

export interface ChipsFilterProps {
  itemsRef: React.MutableRefObject<{
    name: string,
    active: boolean
  }[]>,
}

export function ChipsFilter( { itemsRef }: ChipsFilterProps ) {
  const [ items, setItems ] = useState( itemsRef.current );

  const handleClick = ( index: number ) => {
    const updatedItems = items.map( ( item, i ) => {
      if ( i !== index ) return item;
      item.active = !item.active;
      return item;
    } );

    setItems( updatedItems );
  };

  return (
    <section className={`${ styles[ 'scr-chips' ] }`}>
      { items.map( ( item, i ) => (
        <span
          className={`${ styles[ 'scr-chip' ] } ${ item.active && styles[ 'scr-chip--selected' ] }`}
          key={i}
          onClick={() => handleClick( i )}
        >
          {item.name}
        </span>
      ) ) }
    </section>
  );
}
