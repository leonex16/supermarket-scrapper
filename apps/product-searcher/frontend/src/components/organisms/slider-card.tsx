import React, {
  Suspense, useEffect, useRef, useState
} from 'react';

import { ProductCardLoader } from '../molecules/product-card-loader';
import { ProductCardProps } from './product-card';

import { useLoading } from '../../hooks/use-loading';

import styles from '../../../styles/organisms/slider-card.module.scss';

const ProductCard = React.lazy( () => import( './product-card' ).then( module => ( { default: module.ProductCard } ) ) );

export interface SliderCardProps {
  items: ProductCardProps[];
}

export function SliderCard ( { items }: SliderCardProps ) {
  const MIN_ITEMS_IN_SLIDE = 3;
  const { isLoading } = useLoading();
  const itemsContainerRef = useRef<HTMLDivElement>( null );
  const [ showPrevBtn, setShowPrevBtn ] = useState( false );
  const [ showNextBtn, setShowNextBtn ] = useState( items.length > MIN_ITEMS_IN_SLIDE );

  const itemsToRender = isLoading
    ? Array( MIN_ITEMS_IN_SLIDE ).fill( 0 ).map( ( _, i ) => (
      <section className={`${ styles[ 'scr-slider__item' ] }`} key={+new Date() + i}>
        <ProductCardLoader />
      </section>
    ) )
    : items.map( ( item, index ) => (
      <section className={`${ styles[ 'scr-slider__item' ] }`} key={`${ index }-${ item.name }`} >
        <Suspense fallback={<ProductCardLoader/>}>
          <ProductCard {...item} />
        </Suspense>
      </section>
    ) );

  const handleClick = ( action: 'prev' | 'next' ) => {
    const $slidesContainer = itemsContainerRef.current;

    if ( $slidesContainer === null ) return;

    const SIZE_PRODUCT_CARD = 250 * 2;
    const { scrollLeft } = $slidesContainer;
    const toScroll = ( action === 'prev' )
      ? scrollLeft - SIZE_PRODUCT_CARD
      : scrollLeft + SIZE_PRODUCT_CARD;

    $slidesContainer.scrollTo( { left: toScroll, behavior: 'smooth' } );
  };

  // eslint-disable-next-line no-undef
  const callback: IntersectionObserverCallback = entries => {
    const [ firstItem, lastItem ] = entries;
    const hiddePrevBtn = Boolean( firstItem?.isIntersecting );
    const hiddeNextBtn = Boolean( lastItem?.isIntersecting );
    const hiddeBoth = hiddePrevBtn && hiddeNextBtn;

    if ( hiddeBoth ) {
      setShowPrevBtn( false );
      setShowNextBtn( false );
    }

    if ( hiddeBoth === false ) {
      setShowPrevBtn( true );
      setShowNextBtn( true );
    }

    if ( hiddePrevBtn && hiddeNextBtn === false ) {
      setShowPrevBtn( false );
      setShowNextBtn( true );
    }

    if ( hiddeNextBtn && hiddePrevBtn === false ) {
      setShowPrevBtn( true );
      setShowNextBtn( false );
    }
  };

  useEffect( () => {
    const $slidesContainer = itemsContainerRef.current;

    if ( $slidesContainer === null ) return undefined;

    const $firstItem = $slidesContainer.firstElementChild;
    const $lastItem = $slidesContainer.lastElementChild;

    if ( $firstItem === null ) return undefined;
    if ( $lastItem === null ) return undefined;

    const observer = new IntersectionObserver( callback, {
      root: $slidesContainer,
      threshold: 1
    } );

    observer.observe( $firstItem );
    observer.observe( $lastItem );

    return () => {
      observer.disconnect();
    };
  } );

  return (
    <article className={`${ styles[ 'scr-slider' ] }`}>
      <button
        className={`${ styles[ 'scr-slider__btn' ] } ${ styles[ 'scr-slider__btn--prev' ] }`}
        onClick={() => handleClick( 'prev' )}
        aria-label={'previous item'}
        aria-disabled={!showPrevBtn}
        disabled={!showPrevBtn}
      />
      <div ref={itemsContainerRef} className={`${ styles[ 'scr-slider__items' ] }`}>
        { itemsToRender }
      </div>
      <button
        className={`${ styles[ 'scr-slider__btn' ] } ${ styles[ 'scr-slider__btn--next' ] }`}
        onClick={() => handleClick( 'next' )}
        aria-label={'next item'}
        aria-disabled={!showNextBtn}
        disabled={!showNextBtn}
      />
    </article>
  );
}
