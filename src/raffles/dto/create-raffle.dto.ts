export class CreateRaffleDto {
  usersId: number;
  productId: number;
  bidId: number;
  dateStart: string;
  dateEnd: string;
  isClosed?: boolean;
  finalPrice?: number;
}
