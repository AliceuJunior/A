import { Request, Response } from "express";
import { Disciplina } from "../models";

class DisciplinaController {

    // create
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const disciplina = new Disciplina(req.body);
            const response = await disciplina.save();
            return res.json(response);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // list
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const disciplinas = await Disciplina.find().sort({ descricao: "asc" });
            return res.json(disciplinas);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const disciplina = await Disciplina.findByIdAndDelete(_id);
            if (disciplina) {
                return res.json({ message: "Disciplina excluída com sucesso" });
            } else {
                return res.json({ message: "Disciplina inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, ...data } = req.body;
        try {
            const disciplina = await Disciplina.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!disciplina) {
                return res.json({ message: "Disciplina inexistente!" });
            }
            return res.json(disciplina);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new DisciplinaController();
