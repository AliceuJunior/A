import { Router, Request, Response } from "express";
import pessoa from './Pessoa';
import estudante from './Estudante';
import disciplina from './Disciplina';

const routes = Router();
routes.use("/pessoa", pessoa);
routes.use("/estudante", estudante);
routes.use("/disciplina", disciplina);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;