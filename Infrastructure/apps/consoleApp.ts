import * as BasketUseCases from '@Domain/Entities/Basket/UseCases';
import { BasketRepositoryImplementInMemory } from '@Infrastructure/Implementations/InMemory/BasketRepositoryImplementInMemory';
import { UUIDImplementation } from '@Infrastructure/Libraries';
import basketsRaw from '@Infrastructure/Common/Data/baskets.json';

const newProduct = {
  'id': '1',
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

const logger = ( title: string, value: any ) => {
  const separator = '*'.repeat( 20 );

  global.console.info( `\n${ separator } ${ title } ${ separator }\n` );
  global.console.dir( value );
  global.console.info( '\n' );
};


export const consoleApp = async() => {
  const uuid             = new UUIDImplementation();
  const basketRepository = new BasketRepositoryImplementInMemory( basketsRaw );
  const createBaskte     = new BasketUseCases.CreateBaskteUseCase();
  const addProduct       = new BasketUseCases.AddProductUseCase( createBaskte.execute() );
  const removeproduct    = new BasketUseCases.RemoveProductUseCase( createBaskte.basket );
  const savebasket       = new BasketUseCases.SaveBasketUseCase( uuid, basketRepository );
  const getbasketbyid    = new BasketUseCases.GetBasketByIdUseCase( basketRepository );

  logger( 'CREATE_BASKTE_USE_CASE', createBaskte );
  logger( 'ADD_PRODUCT_USE_CASE', addProduct.execute( newProduct ) );
  logger( 'REMOVE_PRODUCT_USE_CASE', removeproduct.execute( '1' ) );
  logger( 'SAVE_BASKET_USE_CASE', await savebasket.execute( createBaskte.basket ) );
  logger( 'GET_BASKET_BY_ID_USE_CASE', await getbasketbyid.execute( createBaskte.basket.id ) );
}; 
