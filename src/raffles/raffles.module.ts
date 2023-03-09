import { Module } from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { RafflesController } from './raffles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleEntity } from './entities/raffle.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { BidEntity } from 'src/bids/entities/bid.entity';
import { RafflesGateway } from './raffles.gateway';
import { typeOrmConfigAsyncReplica } from 'src/config/orm.config.replica';
import { RaffleRepository } from './raffles.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaffleEntity, UserEntity, BidEntity, UserEntity]),
    TypeOrmModule.forFeature([RaffleEntity, UserEntity, BidEntity, UserEntity], 'replica'),
  ],
  controllers: [RafflesController],
  providers: [RafflesService, RafflesGateway, RaffleRepository],
  exports: [RafflesService],
})
export class RaffleModule {}
