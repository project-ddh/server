import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { RafflesController } from './raffles/raffles.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/orm.config';
import { ProductModule } from './products/products.module';
import { AppController } from './app.controller';
import { RaffleModule } from './raffles/raffles.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    RaffleModule,
    UsersModule,
    ProductModule,
    BidsModule,
  ],
  controllers: [ProductsController, RafflesController, UsersController, AppController],
  providers: [],
})
export class AppModule {}
