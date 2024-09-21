import express, { Express } from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/db";
import mappingInstance from "./src/mapping";
import { ProductsRouter } from "./src/routers/productsRouter";
import { SitesRouter } from "./src/routers/sitesRouter";
import { SitesProductRouter } from "./src/routers/sitesProductRouter";
import { ProductImagesRouter } from "./src/routers/productImagesRouter";
import cors from "cors";
import { cosmoProfCron } from "./src/crons/cosmoProfCron";
import { lorealProfessionalCron } from "./src/crons/lorealProfessionalCronOld";
import { LorealProfessionalCronNew } from "./src/crons/lorealProfessionalCronNew";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use("/api", new ProductsRouter().router);
app.use("/api", new SitesRouter().router);
app.use("/api", new SitesProductRouter().router);
app.use("/api", new ProductImagesRouter().router);
app.use(express.json());


sequelize
  .authenticate()
  .then(async () => {
    const mapping = new mappingInstance();
    mapping.init();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database: ", error);
  });

const port = process.env.SERVER_PORT;

app.listen(port, async () => {
  // await lorealProfessionalCron('loreal-professionnel', 'majirel', 'salonbrandz');
  const loreal = new LorealProfessionalCronNew();
  await loreal.saveImagesInS3();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
