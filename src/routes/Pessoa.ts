import { Router } from "express";
import PessoaController from "../controllers/pessoaController";

const routes = Router();

routes.post('/', PessoaController.create);
routes.get('/', PessoaController.list);
routes.delete('/', PessoaController.delete);
routes.put('/', PessoaController.update);

export default routes;
