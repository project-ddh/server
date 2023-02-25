export class CreateBidDto {
  bidSize: number;
  bidPrice: number;
  bidQuantity: number;
  raffleId: number; // Bid | M : 1 | Raffle
  userId: number; // Bid | M : 1 | User
}
