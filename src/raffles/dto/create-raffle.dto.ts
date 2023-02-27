import { PickType } from '@nestjs/swagger';
import { RaffleEntity } from '../entities/raffle.entity';

export class CreateRaffleDto extends PickType(RaffleEntity, [
  'usersId',
  'productId',
  'dateStart',
  'dateEnd',
  'isClosed',
  'closedPrice',
]) {}
// usersId: number;
// productId: number;
// bidId: number;
// dateStart: string;
// dateEnd: string;
// isClosed?: boolean;
// finalPrice?: number;
