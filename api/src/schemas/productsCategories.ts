import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class ProductsCategories extends Model {
    public productId!: number;
    public categoryId!: number;
}

ProductsCategories.init(
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
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: "products_categories",
        timestamps: false,
        sequelize,
    },
);

export default ProductsCategories;