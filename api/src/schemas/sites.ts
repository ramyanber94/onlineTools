import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class Sites extends Model {
    public id!: number;
    public name!: string;
    public url!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Sites.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
        url: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "sites",
        timestamps: true,
        sequelize,
    },
);

export default Sites;

