import { Repository } from "typeorm";
import {
  TMovie,
  TMovieRequest,
  TMovieUpdate,
} from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { movieSchema, movieSchemaUpdate } from "../schemas/movies.schemas";

const updateMovieService = async (
  idMovie: number,
  newData: any
): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: TMovie | null = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });

  if (movie === null) {
    throw new AppError("Movie not found", 404);
  }

  const newMovie = movieRepository.create({
    ...movie,
    ...newData,
  });
  await movieRepository.save(newMovie);
  console.log(newMovie);
  const movieUpdated: TMovie = movieSchema.parse(newMovie);

  return movieUpdated;
};

export default updateMovieService;
