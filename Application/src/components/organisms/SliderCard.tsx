import React, { useId } from 'react';

import { ProductCard, ProductCardProps } from '@Application/src/components/organisms/ProductCard';

import styles from '@Application/styles/organisms/SliderCard.module.scss';

export interface SliderCardProps {
  items: ProductCardProps[];
}

export function SliderCard( { items }: SliderCardProps ) {
  const sliderId = useId();

  const handleClick = async ( action: 'prev' | 'next' ) => {
    const MAX_SIZE_PRODUCT_CARD = 250 * 2;
    const $slidesContainer = document.getElementById( `${ sliderId }-items` );

    if ( $slidesContainer === null ) return;

    const { scrollLeft } = $slidesContainer;

    if ( action === 'prev' ) {
      $slidesContainer.scrollTo( { left: scrollLeft - MAX_SIZE_PRODUCT_CARD, behavior: 'smooth' } );
    } else if ( action === 'next' ) {
      $slidesContainer.scrollTo( { left: scrollLeft + MAX_SIZE_PRODUCT_CARD, behavior: 'smooth' } );
    }
  };

  return (
    <article id={sliderId} className={`${ styles[ 'scr-slider' ] }`}>
      <button
        className={`${ styles[ 'scr-slider__btn' ] } ${ styles[ 'scr-slider__btn--prev' ] }`}
        onClick={() => handleClick( 'prev' )}
        aria-label={'previous item'}
      />
      <div id={`${ sliderId }-items`} className={`${ styles[ 'scr-slider__items' ] }`}>
        {items.map( ( item, index ) => (
          <section className={`${ styles[ 'scr-slider__item' ] }`} key={`${ index }-${ item.name }`} data-id={index}>
            <ProductCard {...item} />
          </section>
        ) )}
      </div>
      <button
        className={`${ styles[ 'scr-slider__btn' ] } ${ styles[ 'scr-slider__btn--next' ] }`}
        onClick={() => handleClick( 'next' )}
        aria-label={'next item'}
      />
    </article>
  );
}
