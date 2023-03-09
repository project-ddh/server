import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity } from './entities/bid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BidsService {
  constructor(@InjectRepository(BidEntity) private readonly bidRepository: Repository<BidEntity>) {}

  create(bid) {
    this.bidRepository.save(bid);
  }
  async findBySize(size) {
    const result = await this.bidRepository
      .createQueryBuilder('bid')
      .select()
      .where('bid.bidSize = :size', { size: size })
      .take(2000)
      .orderBy('bid.createdAt', 'DESC')
      .getMany();

    return result;
  }
  findAll() {
    return this.bidRepository.find();
  }

  remove(bidId: number) {
    return this.bidRepository.delete({ bidId });
  }
}
