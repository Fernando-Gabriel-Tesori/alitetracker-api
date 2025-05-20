import type { Request, Response } from "express";
import { z } from "zod";
import { habitModel } from "../model/habit.model";

export class HabitsController {
  /**
   * Cria um novo hábito, se ainda não existir.
   */
  async store(req: Request, res: Response): Promise<Response> {
    // Schema de validação com Zod
    const schema = z.object({
      name: z.string().min(1, "O nome do hábito é obrigatório"),
    });

    // Corrigido: usar `req.body` ao invés de `request.body`
    const parseResult = schema.safeParse(req.body);

    // Se a validação falhar, retorna erro
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Erro na validação",
        issues: parseResult.error.format(),
      });
    }

    const { name } = parseResult.data;

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
