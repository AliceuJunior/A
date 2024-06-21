import { Router } from "express";
import EstudanteController from "../controllers/estudanteController";

const routes = Router();

routes.post('/', EstudanteController.create);
routes.get('/', EstudanteController.list);
routes.delete('/', EstudanteController.delete);
routes.put('/', EstudanteController.update);

export default routes;
