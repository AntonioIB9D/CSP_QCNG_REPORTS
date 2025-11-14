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

// Turno → cantidad
const shiftCountSchema = z.record(z.string(), z.number());

// Proceso → Turno → cantidad
const defectsSchema = z.record(z.string(), shiftCountSchema);

// Turno → Defecto → cantidad
const defectDetailsSchema = z.record(z.string(), z.number());

// Proceso → Turno → Defecto → cantidad
const reportDataSchema = z.record(
  z.string(),
  z.record(z.string(), defectDetailsSchema)
);

// Esquema final
export const stationDefectsSchemaValidation = z.object({
  Defects: defectsSchema,
  ReportData: reportDataSchema,
});

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
