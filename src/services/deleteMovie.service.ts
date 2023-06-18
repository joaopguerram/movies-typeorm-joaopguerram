import { Request, Response } from "express";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

const deleteMovieService = async (idMovie: number) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });
  await movieRepository.remove(movie!);
};

export default deleteMovieService;
