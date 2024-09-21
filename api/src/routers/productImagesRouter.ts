import { Router } from "express";
import { ProductImagesController } from "../controllers/productImagesController";

export class ProductImagesRouter {
    private productImagesController = new ProductImagesController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/", this.productImagesController.create);
        this.router.get("/:productId", this.productImagesController.getAllForProduct);
        this.router.get("/:id", this.productImagesController.getById);
        this.router.put("/", this.productImagesController.update);
        this.router.delete("/:id", this.productImagesController.delete);
    }
}