import React from 'react';

import styles from '@Application/styles/molecules/LineBar.module.scss';

export function LineBar() {
  return (
    <header className={`${ styles[ 'scr-line-bar' ] }`} >
      <span className={`${ styles[ 'scr-line-bar__slice' ] } ${ styles[ 'scr-line-bar__slice--tottus' ] }`} />
      <span className={`${ styles[ 'scr-line-bar__slice' ] } ${ styles[ 'scr-line-bar__slice--lider' ] }`} />
      <span className={`${ styles[ 'scr-line-bar__slice' ] } ${ styles[ 'scr-line-bar__slice--jumbo' ] }`} />
      <span className={`${ styles[ 'scr-line-bar__slice' ] } ${ styles[ 'scr-line-bar__slice--santa-isabel' ] }`} />
    </header>
  );
}
