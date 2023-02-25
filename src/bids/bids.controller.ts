import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) { }

  @Post()
  create(@Body() bid) {
    return this.bidsService.create(bid);
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
