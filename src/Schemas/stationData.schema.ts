import { z } from "zod";

export const stationDataSchema = z.object({
  defecto: z.string(),
  cantidad: z.number().int().nonnegative(),
});

export const stationDataSchemaValidation = z.record(
  z.string(),
  z.array(stationDataSchema)
);
