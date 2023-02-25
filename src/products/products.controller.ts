import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../users/jwt/jwt.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()

  create(@Body() product) { // CreateProductDto
    return this.productService.create(product);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId', ParseIntPipe) productId) {
    return this.productService.findOne(productId);
  }

  @Delete(':productId')
  remove(@Param('productId', ParseIntPipe) productId) {
    return this.productService.remove(productId);
  }

  // @Patch(':productId')
  // update(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+productId, updateProductDto);
  // }
}

// /**
//    * 전체조회(/root)
//    * @Get All Products
//    */
// @ApiOperation({
//   summary: 'root 전체조회',
//   description: '상품 전체조회'
// })
// @ApiOkResponse({
//   description: '상품 정상조회'
// })

//   /**
//    * 래플페이지(/event)
//    * @Get
//    */
//   @ApiOperation({
//     summary: 'event 페이지 조회'
//   })
