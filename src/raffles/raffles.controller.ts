import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';

@Controller('raffles')
export class RafflesController {
  findAllcount: number;
  logger: Logger;
  constructor(private readonly rafflesService: RafflesService) {
    this.findAllcount = 0;
    this.logger = new Logger('raffels');
  }
  @Get('test')
  test() {
    return 'Hello World!';
  }

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    this.rafflesService.create(createRaffleDto);
  }

  //bid 쓰기 테스트용
  @Post('bid')
  async createBid(@Body() data) {
    //console.log(data.amount);
    await this.rafflesService.createBid(data);
  }

  @Get('rediscloud')
  redisFindAll() {
    try {
      return this.rafflesService.redisFindAll();
    } catch (Error) {
      this.logger.log(Error);
    }
  }

  //열려있는 경매중에서 어떠어떠한 조건에 맞는 프로덕트 찾기

  @Get()
  findAll() {
    // this.findAllcount++;
    // this.logger.log(`컨트롤러 findAll ${this.findAllcount}번 요청됨`);
    try {
      return this.rafflesService.findAll();
    } catch (Error) {
      this.logger.log(Error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    try {
      return this.rafflesService.findOne(id);
    } catch (Error) {
      this.logger.error(Error);
    }
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id) {
  //   return this.rafflesService.remove(id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRaffleDto: UpdateRaffleDto) {
  //   return this.rafflesService.update(+id, updateRaffleDto);
  // }
}
