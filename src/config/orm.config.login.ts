import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeOrmReplicaConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres',
      host: '101.101.208.44',
      port: configService.get('RDS_PORT'),
      username: configService.get('RDS_USERNAME'),
      password: configService.get('RDS_PASSWORD'),
      database: configService.get('RDS_DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
  }
}
export const typeOrmConfigAsyncLogin: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  name: 'login',
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmReplicaConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
