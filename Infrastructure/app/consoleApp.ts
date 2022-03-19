/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasketCommandRepositoryInMemory } from '../Implementations/InMemory/BasketCommandRepositoryInMemory';
import { BasketQueryRepositoryInMemory } from '../Implementations/InMemory/BasketQueryRepositoryInMemory';


( async () => {
  const basketCommandRepositoryInMemory = new BasketCommandRepositoryInMemory();
  const basketQueryRepositoryInMemory = new BasketQueryRepositoryInMemory();

  // basketQueryRepositoryInMemory.getBasket( 'basket-id' )
  //   .then( console.log );

  // console.log( basketCommandRepositoryInMemory.saveProduct( 
  //   {
  //     'name': 'product-name',
  //     'description': 'product-description',
  //     'detail': {
  //       'normalPrice': 'product-normal-price',
  //       'bestPrice': 'product-best-price',
  //       'unit': 'product-unit'
  //     },
  //     'image': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
  //     'source': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url'
  //   }
  // ) );
  const at = await basketCommandRepositoryInMemory.saveBasket( );
  console.log( { at } );
   


} )();