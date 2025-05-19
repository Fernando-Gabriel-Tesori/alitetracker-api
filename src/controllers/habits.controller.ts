import type { Request, Response } from "express";

interface Habit {
  name: string;
}

export class HabitsController {
  private readonly habits: Habit[] = [];

  store = (req: Request, res: Response): Response => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "O campo 'name' é obrigatório e deve ser uma string." });
    }

    const newHabit: Habit = { name };
    this.habits.push(newHabit);

    return res.status(201).json(newHabit);
  };
}
