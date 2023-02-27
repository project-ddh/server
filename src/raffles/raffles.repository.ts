import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RaffleEntity } from './entities/raffle.entity';

@Injectable()
export class RaffleRepository {
  constructor(
    // @InjectRepository(RaffleEntity, 'replica')
    // private repRaffleRepository: Repository<RaffleEntity>,
    @InjectRepository(RaffleEntity)
    private raffleRepository: Repository<RaffleEntity>,
  ) {}

  async save(raffle) {
    return this.raffleRepository.save(raffle);
  }

  async find() {
    return await this.raffleRepository.find({
      where: { isClosed: false },
      relations: {
        product: true,
        bid: true,
        user: true,
      },
    });
  }
}

// async save(raffle) {
//   // const queryRunner = this.repDataSource.createQueryRunner();
//   // await queryRunner.connect();
//   // await queryRunner.startTransaction();
//   // await queryRunner.manager.save(RaffleEntity, { data: raffle });
//   return this.raffleRepository.save(raffle);
//   // await queryRunner.commitTransaction();
// }

// async find() {
//   return await this.repRaffleRepository.find({
//     where: { isClosed: false },
//     relations: {
//       product: true,
//       bid: true,
//       user: true,
//     },
//   });
// }
