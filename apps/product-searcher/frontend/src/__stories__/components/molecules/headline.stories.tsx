import React from 'react';

import {
  Headline,
  HeadlineSupermarket,
  HeadlineType
} from '../../../components/molecules/headline';

export function Headlines () {
  const headlines = [
    {
      supermarket: HeadlineSupermarket.Jumbo,
      text: 'Headline Text H1',
      type: HeadlineType.H1
    },
    {
      supermarket: HeadlineSupermarket.Lider,
      text: 'Headline Text H2',
      type: HeadlineType.H2
    },
    {
      supermarket: HeadlineSupermarket.SantaIsabel,
      text: 'Headline Text H3',
      type: HeadlineType.H3
    },
    {
      supermarket: HeadlineSupermarket.Tottus,
      text: 'Headline Text H4',
      type: HeadlineType.H4
    },
    {
      supermarket: HeadlineSupermarket.Jumbo,
      text: 'Headline Text H5',
      type: HeadlineType.H5
    },
    {
      supermarket: HeadlineSupermarket.Lider,
      text: 'Headline Text H6',
      type: HeadlineType.H6
    }
  ];
  return headlines.map( headline => (
    <>
      <section>
        <Headline {...headline} />
      </section>
      <hr />
    </>
  ) );
}
