import axiosInstance from "../lib/axios";
import {
  defectDataSchemaValidation,
  stationDataSchemaValidation,
  stationDefectsSchemaValidation,
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

// Fetch total defects by station
export const fetchTotalDefectsByStations = async () => {
  const { data } = await axiosInstance("/estadistics/data/stationTotalDefects");

  const result = stationDefectsSchemaValidation.safeParse(data);

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
  selectedView: string,
  startDate: string,
  endDate: string
) => {
  if (startDate && endDate) {
    const { data } = await axiosInstance(
      `/estadistics/${model}/${selectedView}/${startDate}/${endDate}`
    );
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
  } else {
    const { data } = await axiosInstance(
      `/estadistics/${model}/${selectedView}`
    );
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
  }
};

//Fetch defects by Model, view, and date range
