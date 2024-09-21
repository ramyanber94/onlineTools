// purpose of this file is to seed the database with some initial data

import { sequelize } from "./db";
import Products from "./schemas/products";
import Sites from "./schemas/sites";
import SitesProducts from "./schemas/sitesProducts";
import ProductImages from "./schemas/productImages";


const seed = async () => {
    await sequelize.sync({ force: true });

    const product1 = await Products.create({
        defaultPrice: 100,
        defaultName: "Product 1",
        defaultDesc: "Description 1",
        mainProductId: 1,
        brandId: 1,
        categoryId: 1,
    });

    const product2 = await Products.create({
        defaultPrice: 200,
        defaultName: "Product 2",
        defaultDesc: "Description 2",
        mainProductId: 2,
        brandId: 2,
        categoryId: 2,
    });

    const site1 = await Sites.create({
        name: "Site 1",
        url: "http://localhost:3000",
    });

    const site2 = await Sites.create({
        name: "Site 2",
        url: "http://localhost:3001"
    });

    await SitesProducts.create({
        siteId: site1.id,
        productId: product1.id,
        customName: "Custom Name 1",
        customPrice: 150,
        customDesc: "Custom Description 1",
    });

    await SitesProducts.create({
        siteId: site2.id,
        productId: product2.id,
        customName: "Custom Name 2",
        customPrice: 250,
        customDesc: "Custom Description 2",
    });

    await ProductImages.create({
        productId: product1.id,
        imageUrl: "https://via.placeholder.com/150",
        isMain: true,
    });

    await ProductImages.create({
        productId: product2.id,
        imageUrl: "https://via.placeholder.com/150",
        isMain: false,
    });

    console.log("Seeded database");
};

seed();