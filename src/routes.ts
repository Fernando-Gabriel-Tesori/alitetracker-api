import { Router } from "express";
import packageJson from "../package.json";

export const routes = Router();

// Array para armazenar os hábitos
const habits: { name: string }[] = [];

// Rota GET para informações do package.json
routes.get("/", (request, response) => {
  const { name, description, version } = packageJson;
  return response.status(200).json({ name, description, version });
});

// Rota POST para adicionar um novo hábito
routes.post("/habits", (request, response) => {
  const { name } = request.body;

  // Validação simples
  if (!name) {
    return response
      .status(400)
      .json({ error: "O nome do hábito é obrigatório." });
  }

  const newHabit = { name };
  habits.push(newHabit);

  return response.status(201).json({ newHabit });
});
