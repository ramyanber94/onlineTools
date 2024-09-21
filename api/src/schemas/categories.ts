import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Categories extends Model {
    public id!: number;
    public name!: string;
    public parentId?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Categories.init(
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
        parentId: {
            type: new DataTypes.INTEGER(),
            allowNull: true,
        },
    },
    {
        tableName: "categories",
        timestamps: true,
        sequelize,
    },
);

export default Categories;
