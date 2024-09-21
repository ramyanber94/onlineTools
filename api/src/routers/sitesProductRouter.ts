import { Router } from "express";
import { SitesProductsController } from "../controllers/sitesProductsController";

export class SitesProductRouter {
    private sitesProductController = new SitesProductsController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/", this.sitesProductController.create);
        this.router.get("/:siteId", this.sitesProductController.getAllForSite);
        this.router.get("/:productId", this.sitesProductController.getAllForProduct);
        this.router.get("/:id", this.sitesProductController.getById);
        this.router.put("/", this.sitesProductController.update);
        this.router.delete("/:id", this.sitesProductController.delete)
    }
}