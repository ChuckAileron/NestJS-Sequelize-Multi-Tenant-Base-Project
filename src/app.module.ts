import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostgresService } from './services/postgres.service'
import { attributes as attributes_db1 } from './models/attribute-db1.model';
import { attributes as attributes_db2 } from './models/attribute-db2.model';

@Module({
  imports: [SequelizeModule.forRoot({
      name:'database1',
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postevt',
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forRoot({
      name:'database2',
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'db2',
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([attributes_db1], 'database1'),
    SequelizeModule.forFeature([attributes_db2], 'database2'),
  ],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}