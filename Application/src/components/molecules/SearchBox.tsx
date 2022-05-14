import React from 'react';
import Image from 'next/image';

import styles from '@Application/styles/molecules/SearchBox.module.scss'

export interface SearchBoxProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  placeholder: string,
}

export function SearchBox({handleSubmit, placeholder}: SearchBoxProps) {
  return (
    <form className={`${styles['scr-search-box']}`} onSubmit={handleSubmit} role={'searchbox'} >
      <input className={`${styles['scr-search-box__input']}`} placeholder={placeholder} name="search-input" type="text" />
      <button className={`${styles['scr-search-box__btn']}`}>
        <Image src="/icons/search.svg" alt="search button" role={'search'} width={24} height={24}  />
      </button>
    </form>
  )
}