import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Lines extends Model {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Lines.init(
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
    },
    {
        tableName: "lines",
        timestamps: true,
        sequelize,
    },
);

export default Lines;