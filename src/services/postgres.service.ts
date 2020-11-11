import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { attributes } from './../models/attribute.model';
import { attributes as attributes_db1 } from './../models/attribute-db1.model'
import { attributes as attributes_db2 } from './../models/attribute-db2.model'

@Injectable()
export class PostgresService {
    constructor(
        @InjectModel(attributes_db1, 'database1') private attributesModel1: typeof attributes,
        @InjectModel(attributes_db2, 'database2') private attributesModel2: typeof attributes,
        ) {}

    //Obtener todos los atributos (en db1)
    async db1findAll(): Promise<attributes[]> {
        const res = await this.attributesModel1.findAll();
        return res as attributes[];
    }
    //Obtener todos los atributos (en db2)
    async db2findAll(): Promise<attributes[]> {
        const res = await this.attributesModel2.findAll();
        return res as attributes[];
    }

    //Obtener un atributo (en db1)
    async db1findOne(attribute_id: string): Promise<attributes> {
        return this.attributesModel1.findOne({
            where: {
                attribute_id,
            },
          });
    }
    //Obtener un atributo (en db2)
    async db2findOne(attribute_id: string): Promise<attributes> {
        return this.attributesModel2.findOne({
            where: {
                attribute_id,
            },
        });
    }
    
    //Crear un atributo (en db1)
    async db1create(attributes: attributes): Promise<attributes> {
        return await this.attributesModel1.create(attributes);
    }
    //Crear un atributo (en db2)
    async db2create(attributes: attributes): Promise<attributes> {
        return await this.attributesModel2.create(attributes);
    }

    //Actualizar un atributo (en db1)
    async db1update(body: attributes, attribute_id: string): Promise<void> {
        await this.attributesModel1.update(body, {
            where: {
                attribute_id,
            },
        })
    }
    //Actualizar un atributo (en db2)
    async db2update(body: attributes, attribute_id: string): Promise<void> {
        await this.attributesModel2.update(body, {
            where: {
                attribute_id,
            },
        })
    }

    //Eliminar un atributo (en db1)
    async db1remove(attribute_id: string): Promise<void> {
        const attrib = await this.attributesModel1.findOne({
            where: {
                attribute_id,
            },
        });
        await attrib.destroy();
    }
    //Eliminar un atributo (en db2)
    async db2remove(attribute_id: string): Promise<void> {
        const attrib = await this.attributesModel2.findOne({
            where: {
                attribute_id,
            },
        });
        await attrib.destroy();
    }
}