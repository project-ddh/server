// import { ApiProperty } from '@nestjs/swagger';
// import { CommonEntity } from 'src/common/entities/common.entities';
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { TradeChartsEntity } from '../tradeCharts/tradeCharts.entity';
// import { ProductEntity } from '../entities/product.entity';

// @Entity({ name: 'TradeInfos' })
// export class TradeInfosEntity extends CommonEntity {
//   /**
//    * swagger interface
//    */

//   @ApiProperty({
//     description: `'tradeInfos PK' tradeInfoId`,
//   })
//   @PrimaryGeneratedColumn('increment')
//   tradeInfoId: number;

//   @ApiProperty({
//     description: `trade Price`,
//   })
//   @Column({ type: 'integer' })
//   price: number;

//   @ApiProperty({
//     description: `trade Date`,
//   })
//   @Column({ type: 'date' })
//   date: Date;

//   @ManyToOne(() => TradeChartsEntity, tradeChart => tradeChart.tradeInfo)
//   @JoinColumn({ name: 'tradeChartId' })
//   tradeChart: TradeChartsEntity;

//   @ManyToOne(() => ProductEntity, products => products.tradeInfo)
//   @JoinColumn({ name: 'productsId' })
//   products: ProductEntity
// }
