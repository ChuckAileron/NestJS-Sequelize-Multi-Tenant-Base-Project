import { Controller, Param, Body, HttpCode, Get, Post } from '@nestjs/common';
import { attributes } from './models/attribute.model';
import { PostgresService } from './services/postgres.service';

@Controller('attributes')
export class AppController {
  constructor(private readonly postgresService: PostgresService) {}

    //Obtener todos los atributos
    @Get(':db')
    async getAllAttributes(@Param('db') param_db: string): Promise<attributes[]>{
        if (param_db === 'db1'){
            console.log("esto es db1");
            console.log(param_db);
            return await this.postgresService.db1findAll();
        }
        else{
            console.log("esto es db2");
            console.log(param_db);
            return await this.postgresService.db2findAll();
        }
    }

    //Obtener un atributo
    @Get('/:db/:attribute_id')
    async getAttribute(@Param('db') param_db: string, @Param('attribute_id') param_attribute: string): Promise<attributes>{
        if (param_db === 'db1'){
            console.log("esto es db1");
            console.log(param_db);
            console.log(param_attribute);
            return await this.postgresService.db1findOne(param_attribute);
        }    
        else{
            console.log("esto es db2");
            console.log(param_db);
            console.log(param_attribute);
            return await this.postgresService.db2findOne(param_attribute);
        }
    }

    //Crear un atributo
    @Post('/:db/create')
    @HttpCode(201)
    async postAttribute(@Body() attribute: attributes, @Param('db') param_db: string): Promise<attributes> {
        if (param_db === 'db1'){
            console.log("esto es db1");
            console.log(param_db);
            return await this.postgresService.db1create(attribute);
        }
        else{
            console.log("esto es db2");
            console.log(param_db);
            return await this.postgresService.db2create(attribute);
        } 
    }
}
