// import { ApiProperty } from '@nestjs/swagger';
// import { CommonEntity } from 'src/common/entities/common.entities';
// import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { ProductEntity, ProductsEntity } from '../entities/product.entity';
// import { TradeInfosEntity } from '../tradeInfos/tradeInfos.entity';

// @Entity({ name: 'TradeCharts' })
// export class TradeChartsEntity extends CommonEntity {
//   /**
//    * swagger interface
//    */

//   @ApiProperty({
//     description: `'tradeChart PK' tradeChartId`,
//   })
//   @PrimaryGeneratedColumn('increment')
//   tradeChartId: number;

//   @OneToOne(() => ProductsEntity, products => products.tradeChart)
//   @JoinColumn({ name: 'productId' })
//   products: ProductEntity;

//   @OneToMany(() => TradeInfosEntity, tradeInfo => tradeInfo.tradeChart)
//   tradeInfo: TradeInfosEntity[];
// }
