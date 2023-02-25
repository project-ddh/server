import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity } from './entities/bid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BidsService {
  constructor(@InjectRepository(BidEntity) private readonly bidRepository: Repository<BidEntity>) { }

  create(bid) {
    this.bidRepository.save(bid);
  }

  findAll() {
    return this.bidRepository.find();
  }

  remove(bidId: number) {
    return this.bidRepository.delete({ bidId });
  }
}
