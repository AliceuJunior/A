import { Request, Response } from "express";
import { Estudante } from "../models/";

class EstudanteController {

    // create
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const estudante = new Estudante(req.body);
            const response = await estudante.save();
            return res.json(response);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // list
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const estudantes = await Estudante.find().populate('pessoa');
            return res.json(estudantes);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const estudante = await Estudante.findByIdAndDelete(_id);
            if (estudante) {
                return res.json({ message: "Estudante excluído com sucesso" });
            } else {
                return res.json({ message: "Estudante inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, ...data } = req.body;
        try {
            const estudante = await Estudante.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!estudante) {
                return res.json({ message: "Estudante inexistente!" });
            }
            return res.json(estudante);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new EstudanteController();
