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
  create(@Body() createRaffleDto) {
    //CreateRaffleDto
    return this.rafflesService.create(createRaffleDto);
  }

  @Get()
  findAll() {
    this.findAllcount++;
    this.logger.log(`컨트롤러 findAll ${this.findAllcount}번 요청됨`);
    return this.rafflesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.rafflesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.rafflesService.remove(id);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRaffleDto: UpdateRaffleDto) {
  //   return this.rafflesService.update(+id, updateRaffleDto);
  // }
}
