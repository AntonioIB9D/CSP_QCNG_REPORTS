import axiosInstance from "../lib/axios";
import type { LoginCredential } from "../Types/types";

//Función para hacer login
export async function loginUser({ usuario, contrasena }: LoginCredential) {
  const { data } = await axiosInstance.post("/auth/login", {
    usuario,
    contrasena,
  });
  return data;
}
