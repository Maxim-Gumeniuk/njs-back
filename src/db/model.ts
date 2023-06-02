import { HeroAttributes } from "../types/hero-attributes";
import { sequelize as conection } from "./connection";
import { DataType, Model } from 'sequelize-typescript';

export class HeroClass extends Model<HeroAttributes> {
    public nickName!: string;
    public realName!: string;
    public originalDescription!: string;
    public superPowers!: string;
    public catchPhrase!: string;
    public images!: Array<string>;
}

export const HeroModel = conection.define('Heroes', 
    {
      nickName: {
        type: DataType.STRING,
        allowNull: false,
        field: 'nickname',
      },
      realName: {
        type: DataType.STRING,
        allowNull: false,
        field: 'real_name',
      },
      originalDescription: {
        type: DataType.STRING,
        allowNull: false,
        field: 'original_description',
      },
      superPowers: {
        type: DataType.STRING,
        allowNull: false,
        field: 'superpowers'
      },
      catchPhrase: {
        type: DataType.STRING,
        allowNull: false,
        field: 'catch_phrase'
      },
      images: {
        type: DataType.ARRAY(DataType.STRING),
        defaultValue: [],
        field: 'images'
      },
    },
) as typeof HeroClass;

conection.sync().then(() => {
    console.log('Database and tables created!');
});
