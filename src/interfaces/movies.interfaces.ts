import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  movieSchemaUpdate,
  moviesSchemaResponse,
  sortSchema,
} from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

type TMovie = z.infer<typeof movieSchema>;

type TMovieRequest = z.infer<typeof movieSchemaRequest>;

type TMoviesResponse = z.infer<typeof moviesSchemaResponse>;

type TMovieUpdate = DeepPartial<TMovieRequest>;

type TSort = z.infer<typeof sortSchema>;

type TMoviesPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesResponse;
};

export {
  TMovie,
  TMovieRequest,
  TMoviesResponse,
  TMovieUpdate,
  TSort,
  TMoviesPagination,
};
