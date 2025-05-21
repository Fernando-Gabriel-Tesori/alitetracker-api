import { Router } from "express";
import packageJson from "../package.json";
import { HabitsController } from "./controllers/habits.controller";

const routes = Router();
const habitsController = new HabitsController();

/**
 * Rota principal que retorna informações do package.json
 */
routes.get("/", (req, res) => {
  const { name, description, version } = packageJson;
  return res.status(200).json({ name, description, version });
});

/**
 * Rota para listar todos os hábitos
 */
routes.get("/habits", habitsController.index.bind(habitsController));

/**
 * Rota para criar um novo hábito
 */
routes.post("/habits", habitsController.store.bind(habitsController));

/**
 * Rota para deletar um hábito pelo ID
 */
routes.delete("/habits/:id", habitsController.remove.bind(habitsController));

export { routes };
