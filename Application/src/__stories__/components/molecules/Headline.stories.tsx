import React from 'react';
import {
  Headline,
  HeadlineSupermarket,
  HeadlineType,
} from '@Application/src/components/molecules/Headline';

export function Headlines() {
  const headlines = [
    {
      supermarket: HeadlineSupermarket.Jumbo,
      text: 'Headline Text',
      type: HeadlineType.H1,
    },
    {
      supermarket: HeadlineSupermarket.Lider,
      text: 'Headline Text',
      type: HeadlineType.H2,
    },
    {
      supermarket: HeadlineSupermarket.SantaIsabel,
      text: 'Headline Text',
      type: HeadlineType.H3,
    },
    {
      supermarket: HeadlineSupermarket.Tottus,
      text: 'Headline Text',
      type: HeadlineType.H4,
    },
    {
      supermarket: HeadlineSupermarket.Jumbo,
      text: 'Headline Text',
      type: HeadlineType.H5,
    },
    {
      supermarket: HeadlineSupermarket.Lider,
      text: 'Headline Text',
      type: HeadlineType.H6,
    },
  ];
  return headlines.map((headline) => (
    <>
      <section>
        <Headline {...headline} />
      </section>
      <hr />
    </>
  ));
}
