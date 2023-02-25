import { ApiProperty } from '@nestjs/swagger';
import { BidEntity } from 'src/bids/entities/bid.entity';
import { CommonEntity } from 'src/common/entities/common.entities';
import { RaffleEntity } from 'src/raffles/entities/raffle.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends CommonEntity {
  /**
   * swagger interface
   */
  @ApiProperty({
    description: `Users're Primary Key called: usersId [AutoCreate]`,
    required: true,
  })
  @PrimaryGeneratedColumn('increment')
  usersId: number;

  @ApiProperty({
    description: `User ID`,
    required: true,
  })
  @Column({ type: 'varchar', length: 20 })
  userId: string;

  @ApiProperty({
    description: `User Password`,
    required: true,
  })
  @Column({ type: 'varchar', length: 100 })
  password: string;

  /**
   * User | 1 : M | Raffle
   * 하나의 유저는 다수의 Raffle 를 참조할 수 있다.
   */
  @OneToMany(() => RaffleEntity, raffle => raffle.user, {
    eager: true,
  })
  @JoinColumn({ name: 'raffleId' })
  raffle: RaffleEntity[];

  /**
   * User | 1 : M | Bid
   * 하나의 유저는 다수의 Bid를 생성할 수 있다
   */
  @OneToMany(() => BidEntity, bid => bid.user)
  bid: BidEntity[];
}
