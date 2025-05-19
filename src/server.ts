import express, { response } from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("Hello Express + TypeScript");
});

app.listen(4000, () => {
  console.log(`🚀 App is running at port 4000! `);
});
