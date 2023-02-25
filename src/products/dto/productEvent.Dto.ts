export class ProductEventDto {
  // productId: number;
  // productPrice: number;
  // productName: string;
  // productSize: number;
  // productImage: string;
  // tradeInfo: TradeInfosDto[];

  productId: number;
  productName: string;
  productSize: number;
  productImage: string;
  productPrice: number;
  tradeInfo: TradeInfosDto[];
}
export class TradeInfosDto extends ProductEventDto {
  tradeInfoId: number;
  price: number;
  date: string;
}
