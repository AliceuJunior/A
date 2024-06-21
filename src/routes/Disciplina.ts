import { Router } from "express";
import DisciplinaController from "../controllers/disciplinaController";

const routes = Router();

routes.post('/', DisciplinaController.create);
routes.get('/', DisciplinaController.list);
routes.delete('/disciplina/:id', DisciplinaController.delete);
routes.put('/disciplina/:id', DisciplinaController.update);

export default routes;
