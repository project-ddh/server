import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { BidEntity } from './entities/bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BidEntity])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
