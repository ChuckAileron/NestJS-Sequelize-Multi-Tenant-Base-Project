import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostgresService } from './services/postgres.service'
import { LoggerService } from './logger/logger.service';
import { attributes as attributes_db1 } from './models/attribute-db1.model';
import { attributes as attributes_db2 } from './models/attribute-db2.model';

@Module({
  imports: [ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      name: 'database1',
      dialect: 'postgres',
      host: (Buffer.from(process.env.DB_HOST, 'base64')).toString(),
      port: parseInt((Buffer.from(process.env.DB_PORT, 'base64')).toString(), 10),
      username: (Buffer.from(process.env.DB_USERNAME, 'base64')).toString(),
      password: (Buffer.from(process.env.DB_PASSWORD, 'base64')).toString(),
      database: (Buffer.from(process.env.DB1_NAME, 'base64')).toString(),
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forRoot({
      name: 'database2',
      dialect: 'postgres',
      host: (Buffer.from(process.env.DB_HOST, 'base64')).toString(),
      port: parseInt((Buffer.from(process.env.DB_PORT, 'base64')).toString(), 10),
      username: (Buffer.from(process.env.DB_USERNAME, 'base64')).toString(),
      password: (Buffer.from(process.env.DB_PASSWORD, 'base64')).toString(),
      database: (Buffer.from(process.env.DB2_NAME, 'base64')).toString(),
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([attributes_db1], 'database1'),
    SequelizeModule.forFeature([attributes_db2], 'database2'),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, PostgresService],
})
export class AppModule {}