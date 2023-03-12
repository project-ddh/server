import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BidEntity } from 'src/bids/entities/bid.entity';
import { DataSource, Repository } from 'typeorm';
import { RaffleEntity } from './entities/raffle.entity';
import Redis from 'ioredis';

@Injectable()
export class RaffleRepository {
  logger: Logger;
  constructor(
    //private readonly dataSource: DataSource,
    @InjectRepository(RaffleEntity, 'replica')
    private repRaffleRepository: Repository<RaffleEntity>,
    @InjectRepository(RaffleEntity)
    private raffleRepository: Repository<RaffleEntity>,
    @InjectRepository(BidEntity)
    private bidRepository: Repository<BidEntity>,
    @InjectRepository(BidEntity, 'replica')
    private repBidRepository: Repository<BidEntity>,

    @InjectRedis() private readonly redis: Redis,
  ) {
    this.logger = new Logger('raffels');
  }

  async redisFindAll() {
    const cachedResult = await this.redis.get('raffles');
    if (cachedResult) {
      // console.log(`Raffle result from Redis :D `);
      return JSON.parse(cachedResult);
    }
    //const master = this.dataSource.createQueryRunner('master');
    //const result = await master.manager
    const result = await this.repRaffleRepository
      .createQueryBuilder('raffle')
      //.setQueryRunner(master)
      .leftJoin('raffle.product', 'product')
      .leftJoin('raffle.bid', 'bid')
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
      .orderBy('raffle.dateEnd', 'DESC')
      .addOrderBy('raffle.raffleId', 'DESC')
      .take(10)
      .getMany();

    await this.redis.set('raffles', JSON.stringify(result));
    // console.log(result.length);
    //console.log(`normal result`);
    return result;
  }

  async bidsave(data) {
    const bid = {
      bidSize: data.bidSize,
      usersId: data.user,
      bidPrice: data.amount,
      raffleId: data.raffleId,
    };
    // const bid = new BidEntity();
    // bid.bidPrice = data.amount;
    // bid.usersId = data.user;
    // bid.raffleId = data.raffleId;
    // const master = this.dataSource.createQueryRunner('master');
    // return await master.manager.save(bid);
    const result = await this.bidRepository //.save(bid);
      .createQueryBuilder()
      .insert()
      .into('Bid', ['bidSize', 'usersId', 'bidPrice', 'raffleId'])
      .values(bid)
      .execute();
    // try {
    //   const result = await this.bidRepository.save(bid);
    //   if (result === undefined || result === null) {
    //     await this.repBidRepository.save(bid);
    //   }
    // } catch {
    //   await this.repBidRepository.save(bid);
    // }
  }

  async save(raffle) {
    await this.raffleRepository.save(raffle);
  }

  async find() {
    // const slave = this.dataSource.createQueryRunner('slave');
    // const result = await this.dataSource
    const result = await this.repRaffleRepository
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
      .orderBy('raffle.dateEnd', 'DESC')
      .addOrderBy('raffle.raffleId', 'DESC')
      .cache(true)
      .getMany();
    return { count: result.length, data: result };
  }

  // async find() {
  //   const result = await this.raffleRepository
  //     .createQueryBuilder('raffle')
  //     .leftJoin('raffle.product', 'product')
  //     .select([
  //       'raffle.raffleId',
  //       'product.productImage',
  //       'product.productColor',
  //       'product.productModel',
  //       'product.productName',
  //       'product.releasePrice',
  //       'raffle.dateEnd',
  //     ])
  //     .where('raffle.isClosed = :isClosed', { isClosed: false })
  //     // .loadRelationCountAndMap('raffle.bidCount', 'raffle.bid', 'bidCount')
  //     .orderBy('raffle.dateEnd', 'DESC')
  //     .addOrderBy('raffle.raffleId', 'DESC')
  //     // .take(10)
  //     .cache(true)
  //     .getMany();
  //   return { count: result.length, data: result };
  // }

  async findOne(id: number) {
     const bidCount = await this.bidRepository
       .createQueryBuilder('bid')
       .select('count(*)')
       .where('bid.raffleId = :id', { id })
       .getRawMany();

    const result = await this.repRaffleRepository
      .createQueryBuilder('raffle')
      .leftJoin('raffle.product', 'product')
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
      //.loadRelationCountAndMap('raffle.bidCount', 'raffle.bid', 'bidCount')
      .orderBy('raffle.dateEnd', 'DESC')
      .addOrderBy('raffle.raffleId', 'DESC')
      .getOne();
    //if (!result) this.logger.log('아이디가없습니다');
    return { data: result, bidCount };
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
