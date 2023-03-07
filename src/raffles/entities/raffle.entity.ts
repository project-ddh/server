import { UserEntity } from './../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/entities/common.entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { BidEntity } from 'src/bids/entities/bid.entity';

@Entity({ name: 'Raffle' })
export class RaffleEntity extends CommonEntity {
  /**
   * @ApiProperty Decorator swagger Interface
   */
  @ApiProperty({
    description: `Raffles're Primary key called: rafflesId [AutoCreate]`,
    required: true,
  })
  @PrimaryGeneratedColumn('increment')
  raffleId: number;

  @ApiProperty({ description: `raffle event start date` })
  @Column({ type: 'date' })
  dateStart: string;

  @ApiProperty({ description: `raffle event end date` })
  @Column({ type: 'date' })
  dateEnd: string;

  @ApiProperty({ description: `whether this raffle is closed or not` })
  @Column({ type: 'boolean', default: false })
  isClosed: boolean;

  @ApiProperty({
    description: `final price of this raffle`,
    required: true,
  })
  @Column({ type: 'integer', default: 0 })
  closedPrice: number;

  @ApiProperty({
    description: 'User 테이블 외래키',
  })
  @Column({ type: 'int' })
  usersId: number;

  @ApiProperty({
    description: 'Products 테이블 외래키',
  })
  @Column({ type: 'int' })
  productId: number;

  /**
   * Raffle | M : 1 | User
   */
  @ManyToOne(() => UserEntity, user => user.raffle)
  @JoinColumn({ name: 'usersId' })
  user: UserEntity;

  /**
   * Raffle | M : 1 | Product
   */
  @ManyToOne(() => ProductEntity, product => product.raffle, {
    // eager: true
  })
  @JoinColumn({ name: 'productId' }) // 외래키 설정
  product: ProductEntity;

  /**
   * Raffle | 1 : M | Bid
   */
  @OneToMany(() => BidEntity, bid => bid.raffle, {
    eager: true, // 퍼포먼스 고려한다면 lazy loading도 고려할 것
    cascade: true,
  })
  @JoinColumn({ name: 'bidId' })
  bid: BidEntity[];
}
