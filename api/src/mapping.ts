// Purpose: Mapping class to create relationships between models.
import ProductImages from "./schemas/productImages";
import Products from "./schemas/products";
import Sites from "./schemas/sites";
import SitesProducts from "./schemas/sitesProducts";
import Categories from "./schemas/categories";
import Brands from "./schemas/brands";
import Lines from "./schemas/lines";
import ProductsCategories from "./schemas/productsCategories";
import { sequelize } from "./db";


export default class Mapping {

    constructor() {
        (async () => {
            const tableCreated = await sequelize.getQueryInterface().showAllTables();
            if (tableCreated.length === 0) {
                await sequelize.sync();
            }

            const tableNames = tableCreated.map((table: any) => table.name);

            if (!tableNames.includes('products')) {
                await Products.sync();
            }

            if (!tableNames.includes('product_images')) {
                await ProductImages.sync();
            }

            if (!tableNames.includes('sites')) {
                await Sites.sync();
            }

            if (!tableNames.includes('sites_products')) {
                await SitesProducts.sync();
            }

            if (!tableNames.includes('categories')) {
                await Categories.sync();
            }

            if (!tableNames.includes('brands')) {
                await Brands.sync();
            }

            if (!tableNames.includes('lines')) {
                await Lines.sync();
            }

            if (!tableNames.includes('products_categories')) {
                await ProductsCategories.sync();
            }
        })();

        this.init();
    }


    init() {
        // Define relationships
        Products.belongsTo(Brands, { foreignKey: 'brandId' });
        Products.belongsTo(Lines, { foreignKey: 'lineId' });
        Products.belongsToMany(Categories, { through: ProductsCategories, foreignKey: 'productId' });
        Categories.belongsToMany(Products, { through: ProductsCategories, foreignKey: 'categoryId' });
        Products.hasMany(ProductImages, { foreignKey: 'productId' });
        Sites.belongsToMany(Products, { through: SitesProducts, foreignKey: 'siteId' });
        Products.belongsToMany(Sites, { through: SitesProducts, foreignKey: 'productId' });
    }
}