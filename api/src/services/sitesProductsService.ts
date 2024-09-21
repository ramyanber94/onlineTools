import SitesProducts from "../schemas/sitesProducts";

export class SitesProductsService {

    constructor() { }

    async create(SitesProductsParam: SitesProducts) {
        try {
            const siteProduct = await SitesProducts.create({
                siteId: SitesProductsParam.siteId,
                productId: SitesProductsParam.productId,
                customDesc: SitesProductsParam.customDesc,
                customPrice: SitesProductsParam.customPrice,
                customName: SitesProductsParam.customName,
            });
            return siteProduct;
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const siteProducts = await SitesProducts.findAll();
            return siteProducts;
        } catch (error) {
            return error;
        }
    }

    async getById(id: number) {
        try {
            const siteProduct = await SitesProducts.findByPk(id);
            return siteProduct;
        } catch (error) {
            return error;
        }
    }

    async update(sitesProductsParams: SitesProducts) {
        try {
            const siteProduct = await SitesProducts.findByPk(sitesProductsParams.id);
            if (siteProduct) {
                siteProduct.siteId = sitesProductsParams.siteId;
                siteProduct.productId = sitesProductsParams.productId;
                siteProduct.customDesc = sitesProductsParams.customDesc;
                siteProduct.customPrice = sitesProductsParams.customPrice;
                siteProduct.customName = sitesProductsParams.customName;
                await siteProduct.save();
                return siteProduct;
            } else {
                return "Site Product not found";
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: number) {
        try {
            const siteProduct = await SitesProducts.findByPk(id);
            if (siteProduct) {
                await siteProduct.destroy();
                return "Site Product Deleted"
            } else {
                return "Site Product Not Found"
            }
        } catch (error) {
            return error;
        }
    }

    async getAllForSite(siteId: string) {
        try {
            const siteProducts = await SitesProducts.findAll({
                where: {
                    siteId: siteId
                }
            });
            return siteProducts;
        } catch (error) {
            return error;
        }
    }

    async getAllForProduct(productId: string) {
        try {
            const siteProducts = await SitesProducts.findAll({
                where: {
                    productId: productId
                }
            });
            return siteProducts;
        } catch (error) {
            return error;
        }
    }

    async deleteAll() {
        try {
            await SitesProducts.destroy({ where: {} });
            return "All Sites Have Been Deleted"
        } catch (error) {
            return error;
        }
    }

    async deleteAllForSite(siteId: string) {
        try {
            await SitesProducts.destroy({
                where: {
                    siteId: siteId
                }
            });
            return "Site Product Has Been Deleted"
        } catch (error) {
            return error;
        }
    }

    async deleteAllForProduct(productId: string) {
        try {
            await SitesProducts.destroy({
                where: {
                    productId: productId
                }
            });
            return "Site Product Has Been Deleted"
        } catch (error) {
            return error;
        }
    }
}