/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasketCommandRepositoryInMemory } from '@Infrastructure/Implementations/InMemory/BasketCommandRepositoryInMemory';
import { BasketQueryRepositoryInMemory } from '@Infrastructure/Implementations/InMemory/BasketQueryRepositoryInMemory';

const newProduct = {
  'name': 'product-name',
  'description': 'product-description',
  'detail': {
    'normalPrice': 'product-normal-price',
    'bestPrice': 'product-best-price',
    'unit': 'product-unit'
  },
  'image': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
  'source': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url'
};

export const consoleApp = async () => {
  const basketCommandRepositoryInMemory = new BasketCommandRepositoryInMemory();
  const basketQueryRepositoryInMemory = new BasketQueryRepositoryInMemory();

  const basket = await basketQueryRepositoryInMemory.getBasket( 'basket-id' );
  const basketWithItem = basketCommandRepositoryInMemory.saveProduct( newProduct );
  const basketSaved = await basketCommandRepositoryInMemory.saveBasket( );
  console.log( basket );
}; 
