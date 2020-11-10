import { Column, Model, Table, PrimaryKey, AllowNull } from 'sequelize-typescript';

//CREATE TABLE attributes (attribute_id TEXT PRIMARY KEY, attribute_name TEXT NOT NULL, lov_name TEXT, attribute_multivalue TEXT, etiqueta_web TEXT);

@Table({
    timestamps: false
})
export class attributes extends Model<attributes> {
    @PrimaryKey
    @AllowNull(false)
    @Column
    attribute_id: string;

    @AllowNull(false)
    @Column
    attribute_name: string;

    @AllowNull(true)
    @Column
    lov_name: string;

    @AllowNull(true)
    @Column
    attribute_multivalue: string;

    @AllowNull(true)
    @Column
    etiqueta_web: string;
}