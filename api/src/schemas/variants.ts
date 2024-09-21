import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Variants extends Model {
    public id!: number;
    public variation_name!: string;
    public price!: number;
    public img?: string;
    public variation_image?: string;
    public productId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Variants.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    variation_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    variation_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "variants",
    timestamps: true,
    sequelize,
});

export default Variants;