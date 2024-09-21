import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class SitesProducts extends Model {
    public id!: number;
    public siteId!: number;
    public productId!: number;
    public customName?: string;
    public customPrice?: number;
    public customDesc?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SitesProducts.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        siteId: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        productId: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        customName: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        customPrice: {
            type: new DataTypes.FLOAT(),
            allowNull: true,
        },
        customDesc: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
    },
    {
        tableName: "sites_products",
        timestamps: true,
        sequelize,
    },
);

export default SitesProducts;