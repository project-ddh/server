import { PartialType } from '@nestjs/mapped-types';
import { CreateRaffleDto } from './create-raffle.dto';

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {}
