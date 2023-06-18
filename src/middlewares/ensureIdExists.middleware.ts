import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TMovie } from "../interfaces/movies.interfaces";
import { AppError } from "../errors";

const ensureIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId = Number(req.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieExists: any = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  if (!movieExists) {
    throw new AppError("Movie not found", 404);
  }

  next();
};

export default ensureIdExistsMiddleware;
