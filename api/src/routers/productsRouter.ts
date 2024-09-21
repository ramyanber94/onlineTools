import { Router } from "express";
import { ProductsController } from "../controllers/productsController";

export class ProductsRouter {
    private productsController = new ProductsController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/products/", this.productsController.create.bind(this.productsController));
        this.router.get("/products/", this.productsController.getAll.bind(this.productsController));
        this.router.get("/products/:id", this.productsController.getById.bind(this.productsController));
        this.router.put("/products", this.productsController.update.bind(this.productsController));
        this.router.delete("/products/:id", this.productsController.delete.bind(this.productsController))
    }
}