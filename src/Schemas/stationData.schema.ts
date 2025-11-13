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

const stationDefectsDataSchema = z.record(z.string(), z.number());

export const stationDefectsSchemaValidation = z.record(
  z.string(),
  stationDefectsDataSchema
);

export const defectDataSchemaValidation = z.array(defectDataSchema);

export const registerDataSchema = z.object({
  pk1: z.number(),
  folio: z.number(),
  producto: z.string(),
  defecto: z.string(),
  zona: z.string(),
  proceso: z.string(),
  fecha_rechazo: z.string(),
  fecha_alta: z.string(),
  cavidad: z.string(),
  prensa: z.string(),
  serie: z.string(),
  usuario_alta: z.string(),
  estatus: z.string(),
});
