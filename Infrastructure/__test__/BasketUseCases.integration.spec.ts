/* eslint-disable sort-imports */
import { Basket } from '../../Domain/Entities/Basket/Basket';
import * as BasketUseCases from '../../Domain/Entities/Basket/UseCases/index';
import { BasketRepositoryImplementInMemory } from '../Implementations/InMemory/BasketRepositoryImplementInMemory';
import { UUIDImplementation } from '../Libraries/index';

const product = Object.freeze( {
  'id': '1',
  'name': 'product-name',
  'description': 'product-description',
  'detail': {
    'normalPrice': 'product-normal-price',
    'bestPrice': 'product-best-price',
    'unit': 'product-unit',
  },
  'image': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
  'source': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
} );

describe( 'BasketRepositoryImplementInMemory', () => {
  describe( 'Create a new instance', () => {
    it( 'Should be an instance of BasketRepositoryImplementInMemory', () => {
      const basketRepository = new BasketRepositoryImplementInMemory();

      expect( basketRepository ).toBeInstanceOf( BasketRepositoryImplementInMemory );
    } );

    it( 'With initial data', () => {
      const basketRepository = new BasketRepositoryImplementInMemory( [
        {
          'id': 'basket-id',
          'items': [
            {
              'id': 'product-id',
              'name': 'product-name',
              'description': 'product-description',
              'detail': {
                'normalPrice': 'product-normal-price',
                'bestPrice': 'product-best-price',
                'unit': 'product-unit',
              },
              'image': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
              'source': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
            },
          ],
        },
      ] );

      expect( basketRepository ).toBeInstanceOf( BasketRepositoryImplementInMemory );
    } );
  } );
} );

describe( 'BasketUseCases', () => {
  describe( 'CreateBaskteUseCase', () => {
    it( 'Should create an instance of basket', () => {
      const createBaskteUseCase = new BasketUseCases.CreateBaskteUseCase();
      const basket = createBaskteUseCase.execute();

      expect( basket ).toBeInstanceOf( Basket );
    } );
  } );

  describe( 'AddProductUseCase', () => {
    const createBaskteUseCase = new BasketUseCases.CreateBaskteUseCase();
    let basket: any;
    let newProduct: any;

    beforeEach( () => {
      basket = createBaskteUseCase.execute();
      newProduct = { ...product };
    } );

    it( 'Should add two products in the basket', () => {
      const addProductUseCase = new BasketUseCases.AddProductUseCase( basket );

      addProductUseCase.execute( newProduct );
      addProductUseCase.execute( newProduct );

      expect( basket.items ).toHaveLength( 2 );
    } );

    it( 'Should throws an error when add a product without name', () => {
      delete newProduct.name;
      const addProductUseCase = new BasketUseCases.AddProductUseCase( basket );

      expect( () => addProductUseCase.execute( newProduct ) )
        .toThrowError( 'The name value is required' );
    } );

    it( 'Should throws an error when add a product without unit', () => {
      delete newProduct.detail.unit;
      const addProductUseCase = new BasketUseCases.AddProductUseCase( basket );

      expect( () => addProductUseCase.execute( newProduct ) )
        .toThrowError( 'The unit value is required' );
    } );
  } );

  describe( 'RemoveProductUseCase', () => {
    const createBaskteUseCase = new BasketUseCases.CreateBaskteUseCase();
    const basket = createBaskteUseCase.execute();
    const newProduct = {
      'id': '1',
      'name': 'product-name',
      'description': 'product-description',
      'detail': {
        'normalPrice': 'product-normal-price',
        'bestPrice': 'product-best-price',
        'unit': 'product-unit',
      },
      'image': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
      'source': 'https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url',
    };

    it( 'Should remove by product id', () => {
      const addProductUseCase = new BasketUseCases.AddProductUseCase( basket );
      const removeProductUseCase = new BasketUseCases.RemoveProductUseCase( basket );

      addProductUseCase.execute( newProduct );
      removeProductUseCase.execute( newProduct.id );

      expect( basket.items ).toHaveLength( 0 );
    } );

    it( 'Should do not anything in case the product id not exists', () => {
      const addProductUseCase = new BasketUseCases.AddProductUseCase( basket );
      const removeProductUseCase = new BasketUseCases.RemoveProductUseCase( basket );

      addProductUseCase.execute( newProduct );
      removeProductUseCase.execute( 'newProduct.id' );

      expect( basket.items ).toHaveLength( 1 );
    } );
  } );

  describe( 'SaveBasketUseCase', () => {
    it( 'Should save a basket where the repository configuration specifies', async () => {
      const uuid = new UUIDImplementation();
      const basketRepository = new BasketRepositoryImplementInMemory();
      const createBaskteUseCase = new BasketUseCases.CreateBaskteUseCase();
      const basket = createBaskteUseCase.execute();
      const saveBasketUseCase = new BasketUseCases.SaveBasketUseCase( uuid, basketRepository );

      const savedBasket = await saveBasketUseCase.execute( basket );

      expect( uuid.validate( savedBasket.id ) ).toBe( true );
    } );
  } );

  describe( 'GetBasketByIdUseCase', () => {
    it( 'Should save and get basket from the method', async () => {
      const uuid = new UUIDImplementation();
      const basketRepository = new BasketRepositoryImplementInMemory();
      const createBaskteUseCase = new BasketUseCases.CreateBaskteUseCase();
      const basket = createBaskteUseCase.execute();
      const saveBasketUseCase = new BasketUseCases.SaveBasketUseCase( uuid, basketRepository );
      const getBasketByIdUseCase = new BasketUseCases.GetBasketByIdUseCase( basketRepository );
      const savedBasket = await saveBasketUseCase.execute( basket );

      const gettedBasket = await getBasketByIdUseCase.execute( savedBasket.id );

      expect( uuid.validate( gettedBasket.id ) ).toBe( true );
    } );
  } );
} );
