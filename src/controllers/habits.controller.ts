import type { Request, Response } from "express";
import { habitModel } from "../model/habit.model";

export class HabitsController {
  /**
   * Cria um novo hábito, se ainda não existir.
   */
  async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    // Validação do campo "name"
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "O campo 'name' é obrigatório e deve ser uma string." });
    }

    try {
      // Verifica se o hábito já existe
      const existingHabit = await habitModel.findOne({ name });

      if (existingHabit) {
        return res
          .status(409)
          .json({ error: "Já existe um hábito com esse nome." });
      }

      // Criação do novo hábito
      const newHabit = await habitModel.create({
        name,
        completedDates: [],
      });

      return res.status(201).json(newHabit);
    } catch (error) {
      console.error("Erro ao criar hábito:", error);
      return res
        .status(500)
        .json({ error: "Erro interno ao tentar criar o hábito." });
    }
  }
}
