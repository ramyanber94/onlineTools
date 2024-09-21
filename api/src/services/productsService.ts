import Products from "../schemas/products";

export class ProductsService {

    constructor() { }

    async create(pro: Products) {
        try {
            const product = await Products.create({
                defaultName: pro.defaultName,
                defaultPrice: pro.defaultPrice,
                scrapedFrom: pro.scrapedFrom,
                brandId: pro.brandId,
                defaultDesc: pro.defaultDesc,
            });
            return product;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const products = await Products.findAll();
            return products;
        } catch (error) {
            return error;
        }
    }

    async getById(id: number) {
        try {
            const product = await Products.findByPk(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    async update(pro: Products) {
        try {
            const product = await Products.findByPk(pro.id);
            if (product) {
                product.defaultName = pro.defaultName;
                product.defaultPrice = pro.defaultPrice;
                product.scrapedFrom = pro.scrapedFrom;
                product.brandId = pro.brandId;
                product.defaultDesc = pro.defaultDesc;
                await product.save();
                return product;
            } else {
                return "Product not found";
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: number) {
        try {
            const product = await Products.findByPk(id);
            if (product) {
                await product.destroy();
                return "Product deleted";
            } else {
                return "Product not found";
            }
        } catch (error) {
            return error;
        }
    }
}