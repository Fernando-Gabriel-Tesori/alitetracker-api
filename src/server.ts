import express, { response } from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(4000, () => {
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  console.log(`🚀 App is running at port 4000! `);
});
