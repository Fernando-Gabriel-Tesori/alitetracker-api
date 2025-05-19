import { Router } from "express";
import packageJson from "../package.json";

export const routes = Router();

routes.get("/", (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});
