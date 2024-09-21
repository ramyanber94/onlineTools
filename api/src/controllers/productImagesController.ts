import { Request, Response } from "express";
import { ProductImagesService } from "../services/productImagesService";

export class ProductImagesController {
    private productImagesService = new ProductImagesService();

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            const productImage = await this.productImagesService.create(req.body);
            res.status(201).send(productImage);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAllForProduct(req: Request, res: Response) {
        try {
            const productImages = await this.productImagesService.getAllForProduct(Number(req.params.productId));
            res.status(200).send(productImages);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const productImage = await this.productImagesService.getById(Number(req.params.id));
            res.status(200).send(productImage);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const productImage = await this.productImagesService.update(req.body);
            res.status(200).send(productImage);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const productImage = await this.productImagesService.delete(Number(req.params.id));
            res.status(204).send(productImage);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}