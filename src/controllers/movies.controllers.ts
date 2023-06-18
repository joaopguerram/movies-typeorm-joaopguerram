import { Request, Response } from "express";
import { createMovieService } from "../services/createMovies.service";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import listMoviesService from "../services/listMovies.service";
import updateMovieService from "../services/updateMovie.service";
import { sortSchema } from "../schemas/movies.schemas";
import deleteMovieService from "../services/deleteMovie.service";

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page, perPage, sort, order } = req.query;
  const newSort = sortSchema.parse(sort);
  const movies = await listMoviesService(page, perPage, newSort, order);
  return res.json(movies);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newData = req.body;

  const idMovie = Number(req.params.id);

  const newMovie = await updateMovieService(idMovie, newData);

  return res.status(200).json(newMovie);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idMovie = Number(req.params.id);

  const movie = await deleteMovieService(idMovie);

  return res.status(204).send();
};

export {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
