import axiosInstance from "../lib/axios";
import {
  defectDataSchemaValidation,
  stationDataSchemaValidation,
} from "../Schemas/stationData.schema";

//Fetch station data
export const fetchStationData = async () => {
  const { data } = await axiosInstance("/estadistics/data/stationInfo");

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

//Fetch defects  by Model and view box
export const fetchDefectsByModel = async (
  model: string,
  selectedView: string
) => {
  const { data } = await axiosInstance(`/estadistics/${model}/${selectedView}`);
  const result = defectDataSchemaValidation.safeParse(data);
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

//Fetch defects by Model, view, and date range
