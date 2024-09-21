import { Request, Response } from "express";
import { SitesService } from "../services/sitesService";

export class SitesController {
    private sitesService = new SitesService();

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            const siteParams = req.body;
            const site = await this.sitesService.create(siteParams);
            res.status(201).send(site);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAll(_: Request, res: Response) {
        try {
            const sites = await this.sitesService.getAll();
            res.status(200).send(sites);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const site = await this.sitesService.getById(Number(req.params.id));
            res.status(200).send(site);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const site = await this.sitesService.update(req.body);
            res.status(200).send(site);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const site = await this.sitesService.delete(Number(req.params.id));
            res.status(204).send(site);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteAll(_: Request, res: Response) {
        try {
            const site = await this.sitesService.deleteAll();
            res.status(204).send(site);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}