import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      replication: {
        master: {
          host: configService.get('RDS_HOST'),
          port: configService.get('RDS_PORT'),
          username: configService.get('RDS_USERNAME'),
          password: configService.get('RDS_PASSWORD'),
          database: configService.get('RDS_DATABASE_NAME'),
        },
        slaves: [
          {
            host: '49.50.163.140',
            port: configService.get('RDS_PORT'),
            username: configService.get('RDS_USERNAME'),
            password: configService.get('RDS_PASSWORD'),
            database: configService.get('RDS_DATABASE_NAME'),
          },
        ],
      },
    };
  }
}
// export default class TypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
//     return {
//       keepConnectionAlive: true,
//       type: 'postgres',
//       host: configService.get('RDS_HOST'),
//       port: configService.get('RDS_PORT'),
//       username: configService.get('RDS_USERNAME'),
//       password: configService.get('RDS_PASSWORD'),
//       database: configService.get('RDS_DATABASE_NAME'),
//       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//       synchronize: true,
//       logging: false,
//       // poolSize: 4,
//       // extra: {
//       // max: 10,
//       //   connectionLimit: 1,
//       // },
//     };
//   }
// }
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
