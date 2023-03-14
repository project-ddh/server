import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Logger } from '@nestjs/common';
@Controller('bids')
export class BidsController {
  logger;
  constructor(private readonly bidsService: BidsService) {
    this.logger = new Logger();
  }

  @Post()
  create(@Body() bid) {
    return this.bidsService.create(bid);
  }
  @Get(':size')
  findBySize(@Param('size') size) {
    this.logger.log('size logger is triggered');
    return this.bidsService.findBySize(size);
  }
  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(+id);
  }
}
