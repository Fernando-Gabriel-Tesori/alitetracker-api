import type { Request, Response } from "express";
import { habitModel } from "../model/habit.model";

export class HabitsController {
  store = async (
    req: Request,
    res: Response,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    // Validação básica
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "O campo 'name' é obrigatório e deve ser uma string." });
    }

    try {
      const newHabit = await habitModel.create({
        name,
        completedDates: [],
      });

      return res.status(201).json(newHabit);
    } catch (error) {
      console.error("Erro ao criar hábito:", error);
      return res.status(500).json({ error: "Erro interno ao criar o hábito." });
    }
  };
}
