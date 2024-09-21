import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class Products extends Model {
    public id!: number;
    public defaultName!: string;
    public defaultPrice?: number;
    public defaultDesc?: string;
    public scrapedFrom?: string;
    public brandId!: number;
    public lineId?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Products.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        defaultName: {
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
        defaultPrice: {
            type: new DataTypes.FLOAT(),
            allowNull: true,
        },
        defaultDesc: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        scrapedFrom: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        brandId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        lineId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
    },
    {
        tableName: "products",
        timestamps: true,
        sequelize,
    },
);

export default Products;