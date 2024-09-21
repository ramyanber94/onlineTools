import { Request, Response } from "express";
import { ProductsService } from "../services/productsService";

export class ProductsController {
    private productsService = new ProductsService();

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            const pro = req.body;
            const product = await this.productsService.create(pro);
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAll(_: Request, res: Response) {
        try {
            const products = await this.productsService.getAll();
            console.log("here");
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const product = await this.productsService.getById(Number(req.params.id));
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const product = await this.productsService.update(req.body);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send("Product not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const product = await this.productsService.delete(Number(req.params.id));
            if (product) {
                res.status(204).send();
            } else {
                res.status(404).send("Product not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
}