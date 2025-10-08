import { z } from "zod";

export const stationDataSchema = z.object({
  defecto: z.string(),
  cantidad: z.number().int().nonnegative(),
});

export const stationDataSchemaValidation = z.record(
  z.string(),
  z.array(stationDataSchema)
);

export const defectDataSchema = z.object({
  folio: z.number(),
  producto: z.string(),
  defecto: z.string().nullable(),
  zona: z.string(),
  fecha_rechazo: z.string(),
});

export const defectDataSchemaValidation = z.array(defectDataSchema);
