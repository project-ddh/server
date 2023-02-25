import { RaffleEntity } from 'src/raffles/entities/raffle.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/entities/common.entities';

import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class ProductEntity extends CommonEntity {
  @ApiProperty({
    description: `Products're Primary key called: productsId [AutoCreate]`,
    required: true,
  })
  @PrimaryGeneratedColumn('increment')
  productId: number;

  @ApiProperty({ description: `Product Image Url join AWS-S3` })
  @Column({ type: 'varchar' })
  productImage: string;

  @ApiProperty({ description: `Product unique data for commercial purpose` })
  @Column({ type: 'varchar' })
  productModel: string;

  @ApiProperty({ description: `Product title`, required: true })
  @Column({ type: 'varchar' })
  productName: string;

  @ApiProperty({ description: `Product reg Size` })
  @Column({ type: 'integer' })
  productSize: number;

  @ApiProperty({ description: `Product Size` })
  @Column({ type: 'varchar' })
  productColor: string;

  @ApiProperty({ description: `Product Category` })
  @Column({ type: 'varchar' })
  productCategory: string;

  @ApiProperty({ description: `Product original Price` })
  @Column({ type: 'integer' })
  releasePrice: number;

  @ApiProperty({ description: `Products released date` })
  @Column({ type: 'varchar' })
  releaseDate: string;

  /**
   * Product | 1 : M | Raffle
   */
  @OneToMany(() => RaffleEntity, raffle => raffle.product, {
    // eager: true,
  })
  @JoinColumn({ name: 'raffleId' })
  raffle: RaffleEntity[];
}
