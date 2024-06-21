import { Request, Response } from "express";
import {Pessoa} from "../models";

class PessoaController {

    // create
    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, idade, email, fone } = req.body;
        try {
            //a instância de um modelo é chamada de documento
            const document = new Pessoa({ nome, idade, email, fone });
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // list
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const objects = await Pessoa.find().sort({ nome: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Pessoa.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso!" });
            } else {
                return res.json({ message: "Registro inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, nome, idade, email, fone } = req.body;
        try {
            // busca a Pessoa existente na coleção antes de fazer o update
            const document = await Pessoa.findById(id);
            if (!document) {
                return res.json({ message: "Pessoa inexistente!" });
            }
            // atualiza os campos
            document.nome = nome;
            document.idade = idade;
            document.email = email;
            document.fone = fone;
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new PessoaController();
