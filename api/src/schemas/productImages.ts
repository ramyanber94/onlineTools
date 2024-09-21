import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class ProductImages extends Model {
    public id!: number;
    public productId!: number;
    public imageUrl!: string;
    public isMain!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductImages.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        imageUrl: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        isMain: {
            type: new DataTypes.BOOLEAN(),
            allowNull: false,
        },
    },
    {
        tableName: "product_images",
        timestamps: true,
        sequelize,
    },
);

export default ProductImages;