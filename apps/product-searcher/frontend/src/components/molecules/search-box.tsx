/* eslint-disable @next/next/no-img-element */
import React from 'react';

import iconSearch from '../../../public/icons/search.svg';
import styles from '../../../styles/molecules/search-box.module.scss';

export interface SearchBoxProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  placeholder: string,
}

export function SearchBox ( { handleSubmit, placeholder }: SearchBoxProps ) {
  return (
    <form className={`${ styles[ 'scr-search-box' ] }`} onSubmit={handleSubmit} role={'searchbox'} >
      <input className={`${ styles[ 'scr-search-box__input' ] }`} placeholder={placeholder} name="search-input" type="text" />
      <button className={`${ styles[ 'scr-search-box__btn' ] }`}>
        <img src={iconSearch} alt="Search Icon" width={24} height={24} />
      </button>
    </form>
  );
}
