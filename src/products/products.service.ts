import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
  ) {}

  // 상품 등록 : CreateProductDto
  create(product) {
    this.productRepository.save(product);
  }

  // 상품 리스트 전체 조회(일반)
  // async findAll() {
  //   console.time();
  //   const result = await this.productRepository.find();
  //   console.log('시간 측정 : findAll find() - 데이터 약 1000개 기준. RDS postgres')
  //   console.timeEnd();
  //   const count = result.length;
  //   return { count: count, data: result };
  // }

  // 상품 리스트 전체 조회 (Query builder)
  async findAll() {
    console.time();
    const allProducts = await this.productRepository
      .createQueryBuilder('p')
      .select([
        'p.productId',
        'p.productImage',
        'p.productModel',
        'p.productName',
        'p.productSize',
        'p.productColor',
        'p.productCategory',
        'p.releasePrice',
        'p.releaseDate'
      ])
      .getMany();
      const count = allProducts.length;
      const result = {
        count,
        allProducts
      }
    console.log('시간 측정 : findAll find() - 데이터 약 1000개 기준. RDS postgres')
    console.timeEnd();
    return result;
  }

    // const allProducts = await this.productsRepository
    // .createQueryBuilder('Products')
    // .select([
    //   'Products.productId',
    //   'Products.productName',
    //   'Products.productSize',
    //   'Products.productPrice',
    //   'Products.productImage',
    //   'Products.startPrice',
    // ])
    // .orderBy('Products.productId')
    // .getMany()
    // console.log('상품서비스 FindAll',allProducts)
    // return allProducts
  // }

  // 특정 상품 상세 조회
  findOne(productId: number) {
    return this.productRepository.findOne({ where: { productId: productId } });
  }

  // 특정 상품 삭제
  async remove(productId: number) {
    await this.productRepository.delete({ productId });
  }

  // update(productId: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${productId} raffle`;
  // }
}

// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { ProductsEntity } from './entities/product.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { RafflesEntity } from '../raffles/entities/raffle.entity';
// import { TradeChartsEntity } from './tradeCharts/tradeCharts.entity';

// @Injectable()
// export class ProductsService {
// constructor(
//   @InjectRepository(ProductsEntity)
//   private readonly productsRepository: Repository<ProductsEntity>,
//   @InjectRepository(RafflesEntity)
//   private readonly raffleRepository: Repository<RafflesEntity>,
//   @InjectRepository(TradeChartsEntity)
//   private readonly tradeChartsRepository: Repository<TradeChartsEntity>
// ) {}
//   /**
//    * 전체조회(/root)
//    * @Get All Products
//    */
//   async findAllProducts(){
//   const allProducts = await this.productsRepository
//     .createQueryBuilder('Products')
//     .select([
//       'Products.productId',
//       'Products.productName',
//       'Products.productSize',
//       'Products.productPrice',
//       'Products.productImage',
//       'Products.startPrice',
//     ])
//     .orderBy('Products.productId')
//     .getMany()
//     console.log('상품서비스 FindAll',allProducts)
//     return allProducts
//   }

//   /**
//    * 래플페이지(/event)
//    * @Get
//    */
//   async findOneEvent(productId:number) {
//     const findOneEvent = await this.productsRepository
//       .createQueryBuilder('p')
//       .innerJoin('TradeCharts', 'tc', 'p.productId = tc.productId')
//       .leftJoin('TradeInfos', 'ti', 'ti.tradeChartId = tc.tradeChartId')
//       .select([
//         'p.productId',
//         'p.productName',
//         'p.productSize',
//         'p.productImage',
//         'p.productPrice',
//         'tc.tradeChartId',
//         'tc.tradeInfoId',
//         'ti.price',
//         'ti.date',
//       ])
//       .where('p.productId = :productId', { productId })
//       .getMany();
//     console.log('프로덕트 서비스',findOneEvent)
//     return findOneEvent
//   }
// }
