import axiosInstance from "../lib/axios";
import { stationDataSchemaValidation } from "../Schemas/stationData.schema";

export const fetchStationData = async () => {
  const { data } = await axiosInstance("/registers/data/stations");

  const result = stationDataSchemaValidation.safeParse(data);

  if (!result.success) {
    console.warn("❌ Datos inválidos o vacíos en P1");

    // Mostrar errores de Zod con detalle
    result.error.issues.forEach((err) => {
      console.error(`🔍 Error en propiedad "${err.path.join(".")}"`);
      console.error(`📣 Mensaje: ${err.message}`);
      console.error(`📦 Valor recibido:`, err);
    });

    return null;
  }

  return result.data;
};
