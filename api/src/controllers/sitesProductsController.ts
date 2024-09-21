import { Request, Response } from "express";
import { SitesProductsService } from '../services/sitesProductsService';

export class SitesProductsController {
    private sitesProductsService = new SitesProductsService();

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            const siteProductParams = req.body;
            const siteProduct = await this.sitesProductsService.create(siteProductParams);
            res.status(201).send(siteProduct);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const siteProduct = await this.sitesProductsService.getById(req.body.id);
            res.status(200).send(siteProduct);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const siteProductParams = req.body;
            const siteProduct = await this.sitesProductsService.update(siteProductParams);
            res.status(200).send(siteProduct);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const siteProduct = await this.sitesProductsService.delete(req.body.id);
            res.status(200).send(siteProduct);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAllForSite(req: Request, res: Response) {
        try {
            const siteProducts = await this.sitesProductsService.getAllForSite(req.body.siteId);
            res.status(200).send(siteProducts);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAllForProduct(req: Request, res: Response) {
        try {
            const siteProducts = await this.sitesProductsService.getAllForProduct(req.body.productId);
            res.status(200).send(siteProducts);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteAll(_: Request, res: Response) {
        try {
            await this.sitesProductsService.deleteAll();
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteAllForSite(req: Request, res: Response) {
        try {
            await this.sitesProductsService.deleteAllForSite(req.body.siteId);
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteAllForProduct(req: Request, res: Response) {
        try {
            await this.sitesProductsService.deleteAllForProduct(req.body.productId);
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}