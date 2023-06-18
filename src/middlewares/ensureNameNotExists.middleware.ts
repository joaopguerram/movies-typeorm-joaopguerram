import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { TMovie } from "../interfaces/movies.interfaces";
import { AppError } from "../errors";

const ensureNameNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieName = req.body.name;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieExists: TMovie | null = await movieRepository.findOne({
    where: {
      name: movieName,
    },
  });

  if (movieExists !== null) {
    throw new AppError("Movie already exists.", 409);
  }

  next();
};

export default ensureNameNotExistsMiddleware;
