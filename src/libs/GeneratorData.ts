// eslint-disable-next-line import/no-extraneous-dependencies
import {
  randImg, randNumber, randProductDescription, randProductName, randUrl,
} from '@ngneat/falso';

import { SUPERMARKET_SELECTORS } from '#src/constants/index';
import { Supermarkets } from '#src/types';
import { GeneratorData as IGeneratorData, Options } from '#src/interfaces/index';

export class GeneratorData implements IGeneratorData {
  private readonly UNDEFINED_PROBABILITY = 0.3;

  randProductName( opts?: Options ) {
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : randProductName();
  }

  randProductDescription( opts?: Options ) {
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : randProductDescription();
  }

  randProductPrice( opts?: Options ) {
    const price = randNumber( { min: 0, max: 50000 } );
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : new Intl.NumberFormat( 'es-CL', { style: 'currency', currency: 'CLP' } ).format( price );
  }

  randProductUnit( opts?: Options ) {
    const quantity = randNumber( { min: 1, max: 3000 } );
    const unit = [
      'kg',
      'g',
      'ml',
      'l',
      'unidad',
      'unidades',
      'u',
    ];
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : `${ quantity } ${ unit[ randNumber( { min: 0, max: unit.length - 1 } ) ] }`;
  }

  randImg( opts?: Options ) {
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : randImg();
  }

  randUrl( opts?: Options ) {
    return Math.random() >= this.UNDEFINED_PROBABILITY && opts?.randUndefined === true
      ? undefined
      : randUrl();
  }

  static randSupermarket(): Supermarkets {
    const supermarkets = Object.keys( SUPERMARKET_SELECTORS );
    const randIndex = randNumber( { min: 0, max: supermarkets.length - 1 } );

    return supermarkets[ randIndex ] as Supermarkets;
  }
}
