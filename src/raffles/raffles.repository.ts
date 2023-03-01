import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BidEntity } from 'src/bids/entities/bid.entity';
import { DataSource, Repository } from 'typeorm';
import { RaffleEntity } from './entities/raffle.entity';

@Injectable()
export class RaffleRepository {
  logger: Logger;
  constructor(
    private readonly dataSource: DataSource,
    // @InjectRepository(RaffleEntity, 'replica')
    // private repRaffleRepository: Repository<RaffleEntity>,
    @InjectRepository(RaffleEntity)
    private raffleRepository: Repository<RaffleEntity>,
    @InjectRepository(BidEntity)
    private bidRepository: Repository<BidEntity>,
  ) {
    this.logger = new Logger('raffels');
  }

  async bidsave(data) {
    const bid = {
      usersId: data.user,
      bidPrice: data.amount,
      raffleId: data.raffleId,
    };
    const slave = this.dataSource.createQueryRunner('slave');
    await slave.manager.save(BidEntity, { data: bid });
    // await this.bidRepository.save(bid);
  }

  async save(raffle) {
    return await this.raffleRepository.save(raffle);
  }

  async find() {
    const result = await this.raffleRepository
      .createQueryBuilder('raffle')
      .leftJoin('raffle.product', 'product')
      .select([
        'raffle.raffleId',
        'product.productImage',
        'product.productColor',
        'product.productModel',
        'product.productName',
        'product.releasePrice',
        'raffle.dateEnd',
      ])
      .where('raffle.isClosed = :isClosed', { isClosed: false })
      .loadRelationCountAndMap('raffle.bidCount', 'raffle.bid', 'bidCount')
      .orderBy('raffle.dateEnd', 'DESC')
      .addOrderBy('raffle.raffleId', 'DESC')
      // .take(10)
      .getMany();
    return { count: result.length, data: result };
  }

  // async findOne(id: number) {
  //   const currentRaffle = await this.raffleRepository.findOne({
  //     where: { raffleId: id },
  //     relations: {
  //       product: true,
  //       bid: true,
  //     },
  //   });
  //   const {
  //     product: { productId },
  //   } = currentRaffle;

  //   // 래플들 모두 가져오는데, 조건은 해당 래플이 현재 래플에서 참조하는 productID와 같은 경우
  //   const previousRaffle = await this.raffleRepository.find({
  //     where: {
  //       product: {
  //         productId: productId,
  //       },
  //     },
  //   });

  //   const result = {
  //     data: currentRaffle,
  //     raffleHistory: previousRaffle,
  //   };
  //   return result;
  // }

  async findOne(id: number) {
    const result = await this.raffleRepository
      .createQueryBuilder('raffle')
      .leftJoinAndSelect('raffle.product', 'product')
      .where('raffle.raffleId = :id', { id: id })
      .select([
        'raffle.raffleId',
        'product.productImage',
        'product.productColor',
        'product.productModel',
        'product.productName',
        'product.releasePrice',
        'raffle.dateEnd',
      ])
      .loadRelationCountAndMap('raffle.bidCount', 'raffle.bid')
      .orderBy('raffle.dateEnd', 'DESC')
      .addOrderBy('raffle.raffleId', 'DESC')
      .getOne();
    if (!result) this.logger.log('아이디가없습니다');
    return { data: result, raffleHistory: {} };
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
