import { Controller, Param, Body, HttpCode, Get, Post, Put, Delete } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { attributes } from './models/attribute.model';
import { PostgresService } from './services/postgres.service';

@Controller('attributes')
export class AppController {
    constructor(
      private readonly postgresService: PostgresService,
      private logger: LoggerService,
    ) {}

    //Obtener todos los atributos
    @Get(':db')
    async getAllAttributes(@Param('db') param_db: string): Promise<attributes[]>{
        if (param_db === 'db1'){
            this.logger.customInfo({}, {
                msg: 'Attributes succesfully returned from table attributes on database db1',
                status: 'success'
            });
            return await this.postgresService.db1findAll();
        }
        else{
            this.logger.customInfo({}, {
                msg: 'Attributes succesfully returned from table attributes on database db2',
                status: 'success'
            });
            return await this.postgresService.db2findAll();
        }
    }

    //Obtener un atributo
    @Get('/:db/:attribute_id')
    async getAttribute(@Param('db') param_db: string, @Param('attribute_id') param_attribute: string): Promise<attributes>{
        if (param_db === 'db1'){
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully returned from table attributes on database db1',
                status: 'success'
            });
            return await this.postgresService.db1findOne(param_attribute);
        }    
        else{
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully returned from table attributes on database db2',
                status: 'success'
            });
            return await this.postgresService.db2findOne(param_attribute);
        }
    }

    //Crear un atributo
    @Post('/:db/create')
    @HttpCode(201)
    async postAttribute(@Body() attribute: attributes, @Param('db') param_db: string): Promise<attributes> {
        if (param_db === 'db1'){
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully inserted on table attributes on database db1',
                status: 'success'
            });
            return await this.postgresService.db1create(attribute);
        }
        else{
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully inserted on table attributes on database db1',
                status: 'success'
            });
            return await this.postgresService.db2create(attribute);
        } 
    }

    //Actualizar un atributo
    @Put('/:db/:attribute_id/update')
    @HttpCode(200)
    async updateAttribute(@Body() attribute: attributes, @Param('db') param_db: string, @Param('attribute_id') param_attribute: string): Promise<void> {
        if (param_db === 'db1'){
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully updated from table attributes on database db1',
                status: 'success'
            });
            await this.postgresService.db1update(attribute, param_attribute);
        }
        else{
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully updated from table attributes on database db2',
                status: 'success'
            });
            await this.postgresService.db2update(attribute, param_attribute);
        }
    }

    //Eliminar un atributo
    @Delete('/:db/:attribute_id/delete')
    @HttpCode(200)
    async deleteAttribute(@Param('db') param_db: string, @Param('attribute_id') param_attribute: string): Promise<void>{
        if (param_db === 'db1'){
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully removed from table attributes on database db1',
                status: 'success'
            });
            await this.postgresService.db1remove(param_attribute);
        }
        else{
            this.logger.customInfo({}, {
                msg: 'Attribute succesfully removed from table attributes on database db2',
                status: 'success'
            });
            await this.postgresService.db2remove(param_attribute);
        } 
    }
}
