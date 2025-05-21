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
    });

    // Validação dos dados recebidos
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      // Em caso de erro de validação, retorna 422 com detalhes
      const errors = buildValidationErrorMessage(parsed.error.issues);
      return res.status(422).json({
        message: "Erro na validação",
        issues: parsed.error.format(),
      });
    }

    const { name } = parsed.data;

    try {
      // Verifica se já existe um hábito com esse nome
      const existingHabit = await habitModel.findOne({ name });

      if (existingHabit) {
        return res
          .status(409)
          .json({ error: "Já existe um hábito com esse nome." });
      }

      // Cria e salva o novo hábito
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

  /**
   * Lista todos os hábitos ordenados por nome.
   */
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const habits = await habitModel.find().sort({ name: 1 });
      return res.status(200).json(habits);
    } catch (error) {
      console.error("Erro ao listar hábitos:", error);
      return res.status(500).json({
        error: "Erro interno ao tentar listar os hábitos.",
      });
    }
  }

  /**
   * Remove um hábito pelo id.
   */
  async remove(req: Request, res: Response): Promise<Response> {
    // Schema para validar o parâmetro id da rota
    const schema = z.object({
      id: z.string().min(1, "ID é obrigatório"),
    });

    const parsed = schema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(422).json({
        message: "Erro na validação do parâmetro",
        issues: parsed.error.format(),
      });
    }

    try {
      // DeleteOne espera filtro pelo campo correto do Mongo, geralmente _id
      const result = await habitModel.deleteOne({ _id: parsed.data.id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Hábito não encontrado." });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar hábito:", error);
      return res.status(500).json({
        error: "Erro interno ao tentar deletar o hábito.",
      });
    }
  }
}
