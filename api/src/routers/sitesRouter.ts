import { Router } from "express";
import { SitesController } from "../controllers/sitesController";

export class SitesRouter {
    private sitesController = new SitesController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/", this.sitesController.create);
        this.router.get("/", this.sitesController.getAll);
        this.router.get("/:id", this.sitesController.getById);
        this.router.put("/", this.sitesController.update);
        this.router.delete("/:id", this.sitesController.delete)
    }
}