import React from 'react';

import styles from '../../../styles/molecules/headline.module.scss';

export enum HeadlineType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export enum HeadlineSupermarket {
  Jumbo = 'jumbo',
  Lider = 'lider',
  SantaIsabel = 'santa-isabel',
  Tottus = 'tottus',
}

export interface HeadlineProps {
  supermarket: HeadlineSupermarket,
  text: string,
  type: HeadlineType,
}

export function Headline ( { supermarket, text, type }: HeadlineProps ) {
  const className = `${ styles[ 'scr-headline' ] } ${ styles[ `scr-headline--${ supermarket }` ] }`;
  const headlines = {
    h1: <h1 className={className}>{text}</h1>,
    h2: <h2 className={className}>{text}</h2>,
    h3: <h3 className={className}>{text}</h3>,
    h4: <h4 className={className}>{text}</h4>,
    h5: <h5 className={className}>{text}</h5>,
    h6: <h6 className={className}>{text}</h6>
  };
  const headline = headlines[ type ];

  return headline;
}
