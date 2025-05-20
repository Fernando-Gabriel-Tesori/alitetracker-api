import type { Request, Response } from "express";
import { z } from "zod";
import { habitModel } from "../model/habit.model";
import { buildValidationErrorMessage } from "../utils/build-validation-error-message.util";

export class HabitsController {
  /**
   * Cria um novo hábito, se ainda não existir.
   */
  async store(req: Request, res: Response): Promise<Response> {
    // Schema de validação com Zod
    const schema = z.object({
      name: z.string().min(1, "O nome do hábito é obrigatório"),
      // Caso futuramente queira validar outros campos, adicione aqui
    });

    // Extrai os dados do corpo da requisição
    const habit = schema.safeParse(req.body);

    // Se a validação falhar, retorna erro
    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);
      return res.status(422).json({
        message: "Erro na validação",
        issues: habit.error.format(),
      });
    }

    const { name } = habit.data;

    try {
      // Verifica se o hábito já existe
      const findHabit = await habitModel.findOne({ name });

      if (findHabit) {
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
      return res.status(500).json({
        error: "Erro interno ao tentar criar o hábito.",
      });
    }
  }

  index = async (request: Request, response: Response) => {
    const habits = await habitModel.find().sort({ name: 1 });

    return response.status(200).json(habits);
  };
}
