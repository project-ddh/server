import { Injectable } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { Repository } from 'typeorm';
import { RaffleEntity } from './entities/raffle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RaffleRepository } from './raffles.repository';

@Injectable()
export class RafflesService {
  constructor(private readonly raffleRepository: RaffleRepository) {}

  create(raffle) {
    console.log(`raffle create: ${JSON.stringify(raffle)}`);
    return this.raffleRepository.save(raffle);
  }

  //bid test용
  async createBid(data) {
    //console.log(data);
    await this.raffleRepository.bidsave(data);
  }

  //redis용
  async redisFindAll() {
    return this.raffleRepository.redisFindAll();
  }

  // 래플 리스트 전체 조회
  async findAll() {
    return this.raffleRepository.find();
  }

  //상품 상세조회
  async findOne(id) {
    return this.raffleRepository.findOne(id);
  }
  // 특정 상품 상세 조회
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

  // 특정 상품 삭제
  // async remove(raffleId: number) {
  //   await this.raffleRepository.delete({ raffleId });
  // }

  // update(id: number, updateRaffleDto: UpdateRaffleDto) {
  //   return `This action updates a #${id} raffle`;
  // }
}
