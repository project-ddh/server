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
import { typeOrmConfigAsyncReplica } from './config/orm.config.replica';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { typeOrmConfigAsyncLogin } from './config/orm.config.login';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmModule.forRootAsync(typeOrmConfigAsyncReplica),
    TypeOrmModule.forRootAsync(typeOrmConfigAsyncLogin),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PW,
      },
    }),

    RaffleModule,
    UsersModule,
    ProductModule,
    BidsModule,
  ],
  controllers: [ProductsController, RafflesController, UsersController, AppController],
  providers: [],
})
export class AppModule {}
