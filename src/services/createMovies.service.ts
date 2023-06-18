import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const createMovieService = async (
  movieData: TMovieRequest
): Promise<TMovie> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const movie: TMovie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  return movie;
};

export { createMovieService };
