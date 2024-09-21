import ProductImages from "../schemas/productImages";

export class ProductImagesService {
    constructor() { }

    async create(productImage: ProductImages) {
        try {
            const image = await ProductImages.create({
                productId: productImage.productId,
                imageUrl: productImage.imageUrl,
            });
            return image;
        } catch (error) {
            return error;
        }
    }

    async getAllForProduct(productId: number) {
        try {
            const images = await ProductImages.findAll({
                where: {
                    productId: productId
                }
            });
            return images;
        } catch (error) {
            return error;
        }
    }

    async getById(id: number) {
        try {
            const image = await ProductImages.findByPk(id);
            return image;
        } catch (error) {
            return error;
        }
    }

    async update(productImage: ProductImages) {
        try {
            const image = await ProductImages.findByPk(productImage.id);
            if (image) {
                image.productId = productImage.productId;
                image.imageUrl = productImage.imageUrl;
                await image.save();
                return image;
            } else {
                return "Product Image not found";
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: number) {
        try {
            const image = await ProductImages.findByPk(id);
            if (image) {
                await image.destroy();
                return "Product Image deleted";
            } else {
                return "Product Image not found";
            }
        } catch (error) {
            return error;
        }
    }
}