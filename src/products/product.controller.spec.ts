import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RaffleEntity } from 'src/raffles/entities/raffle.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const mockService = {
  findAll: jest.fn(),
};

describe('productController', () => {
  let productsService: ProductsService;
  let productController: ProductsController;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();

    productController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });
  it('findAll함수', async () => {
    const data: ProductEntity = {
      productId: 1,
      productImage: 'ads123124aaaa',
      productModel: 'aaaa',
      productName: 'aaaa',
      productSize: 1,
      productColor: 'blue',
      productCategory: 'category',
      releasePrice: 1000,
      releaseDate: '2022-01-01',
      createdAt: new Date(),
      updatedAt: new Date(),
      raffle: [],
      deletedAt: new Date(),
    };
    jest.spyOn(productsService, 'findAll').mockResolvedValue({ count: 1, allProducts: [data] });
    const result = await productController.findAll();
    expect(result).toEqual({ count: [data].length, allProducts: [data] });
  });
});
