export class CreateProductDto {
  productImage: string;
  productModel: string;
  productName: string;
  productSize: number;
  productColor: string;
  productCategory: string;
  releasePrice: number;
  releaseDate: string;
}
/*
JSON Example

{
  "productImage": "sample_url",
  "productModel": "sample_SBA-2022-AD",
  "productName": "sample_Jordan shoes"
  "productSize": 255,
  "productColor": "red/black",
  "productCategory": "sneakers",
  "releasePrice": 235000,
  "releaseDate": "2022-02-22"
}
 */
