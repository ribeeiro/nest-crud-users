import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.CONNECTION_HOST,
      port: Number(process.env.CONNECTION_PORT),
      username: process.env.CONNECTION_USERNAME,
      password: process.env.CONNECTION_PASSWORD,
      database: process.env.CONNECTION_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
