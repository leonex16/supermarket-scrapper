/* eslint-disable @next/next/no-img-element */

import React from 'react';

import { Button, ButtonColor, ButtonProps } from '@Application/src/components/molecules/Button';

import styles from '@Application/styles/organisms/ProductCard.module.scss';

export interface ProductCardProps {
  name: string,
  description: string | null,
  unit: string,
  price: string | null,
  image: string,
  source: string,
}

export function ProductCard( product: ProductCardProps ) {
  const props: ButtonProps = {
    color: ButtonColor.Primary,
    onClick: () => console.info( 'Add to card' ),
    text: 'Agregar al Carrito',
  };

  return (
    <article className={`${ styles[ 'scr-product-card' ] }`} role={'listitem'}>
      <a className={`${ styles[ 'scr-product-card__figure' ] }`} href={product.source} target={'_blank'} rel={'noopener noreferrer'} >
        <img className={`${ styles[ 'scr-product-card__img' ] }`} src={product.image} alt={product.name}/>
      </a>
      <section className={`${ styles[ 'scr-product-card__body' ] }`}>
        <header className={`${ styles[ 'scr-product-card__header' ] }`}>
          <p className={`${ styles[ 'scr-product-card__name' ] }`}>{product.name}</p>
          <p className={`${ styles[ 'scr-product-card__description' ] }`}>{product.description}</p>
        </header>
        <div>
          <span className={`${ styles[ 'scr-product-card__price' ] }`}>{product.price}</span>
          <span className={`${ styles[ 'scr-product-card__unit' ] }`}>{product.unit}</span>
        </div>
        <footer className={`${ styles[ 'scr-product-card__footer' ] }`}>
          <Button {...props}/>
        </footer>
      </section>
    </article>
  );
}
