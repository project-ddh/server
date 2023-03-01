import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/entities/common.entities';
import { RaffleEntity } from 'src/raffles/entities/raffle.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Bid' })
export class BidEntity extends CommonEntity {
  @ApiProperty({
    description: `Bids're Primary key called: bidsId [AutoCreate]`,
    required: true,
  })
  @PrimaryGeneratedColumn('increment')
  bidId: number;

  @ApiProperty({ description: `Biding shoes size`, required: false })
  @Column({ type: 'integer', nullable: true })
  bidSize: number;

  @ApiProperty({ description: `Bid price`, required: true })
  @Column({ type: 'integer' })
  bidPrice: number;

  @ApiProperty({ description: `Bid Quantity`, required: false })
  @Column({ type: 'integer', nullable: true })
  bidQuantity: number;

  @Column({ type: 'integer' })
  usersId: number;

  @Column({ type: 'integer' })
  raffleId: number;
  /**
   * Bid | M : 1 | Raffle - 래플 1개에 다수의 비즈가 포함된다
   */
  @ManyToOne(() => RaffleEntity, raffle => raffle.bid)
  @JoinColumn({ name: 'raffleId' })
  raffle: RaffleEntity;

  /**
   * Bid | M : 1 | User
   * 유저 1명에 다수의 비즈를 생성할 수 있다
   * usersId(o)
   * userId(x) : 닉네임을 지칭
   */
  @ManyToOne(() => UserEntity, user => user.bid)
  @JoinColumn({ name: 'usersId' })
  user: UserEntity;
}
