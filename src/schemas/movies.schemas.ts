import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  description: z.string().nullable().optional(),
  duration: z.number().positive(),
  price: z.number().int(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const moviesSchemaResponse = z.array(movieSchema);

const movieSchemaUpdate = movieSchemaRequest.partial();

const sortSchema = z.enum(["id", "duration", "price"]).default("id");

export {
  movieSchema,
  movieSchemaRequest,
  moviesSchemaResponse,
  movieSchemaUpdate,
  sortSchema,
};
