import { ProductCardProps } from '../../../src/components/organisms/product-card';
import { SliderCard } from '../../../src/components/organisms/slider-card';
import { Headline, HeadlineSupermarket, HeadlineType } from '../../../src/components/molecules/headline';

import styles from '../index.module.scss';

interface SupermarketContentProps {
  type: HeadlineSupermarket;
  items: ProductCardProps[];
}

export function SupermarketContent ( { type, items }: SupermarketContentProps ) {
  const labels = {
    'jumbo': 'Jumbo',
    'lider': 'Lider',
    'santa-isabel': 'Santa Isabel',
    'tottus': 'Tottus'
  };

  return (
    <section className={`${ styles.supermarket }`}>

      <header className={`${ styles.supermarket__header }`}>
        <Headline text={labels[ type ]} supermarket={type} type={HeadlineType.H3} />
      </header>

      <article className={`${ styles.supermarket__products }`}>
        <div className={`${ styles.supermarket__slider }`}>
          <SliderCard items={ items } />
        </div>
      </article>

    </section>
  );
}
