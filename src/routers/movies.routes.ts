import { Router } from "express";
import {
  createMoviesController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  movieSchemaRequest,
  movieSchemaUpdate,
} from "../schemas/movies.schemas";
import ensureNameNotExistsMiddleware from "../middlewares/ensureNameNotExists.middleware";
import ensureIdExistsMiddleware from "../middlewares/ensureIdExists.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieSchemaRequest),
  ensureNameNotExistsMiddleware,
  createMoviesController
);

moviesRoutes.get("", listMoviesController);

moviesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(movieSchemaUpdate),
  ensureIdExistsMiddleware,
  ensureNameNotExistsMiddleware,
  updateMovieController
);

moviesRoutes.delete("/:id", ensureIdExistsMiddleware, deleteMovieController);

export default moviesRoutes;
