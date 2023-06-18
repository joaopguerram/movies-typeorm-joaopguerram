import express from "express";
import { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import { handleErros } from "./errors";
import moviesRoutes from "./routers/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);

app.use(handleErros);

export default app;
