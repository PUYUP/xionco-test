import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateBody } from "../middlewares/validate-body";
import { ProductCreateSchema } from "../schemas/product";

const router = Router();
const controller = new ProductController();

// Product CRUD
router.post('/', validateBody(ProductCreateSchema), controller.create);
router.get('/', controller.get);
router.put('/:id', validateBody(ProductCreateSchema), controller.update);
router.delete('/:id', controller.remove);

export default router;