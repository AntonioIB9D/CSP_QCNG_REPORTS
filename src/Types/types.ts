export type LoginCredential = {
  usuario: string;
  contrasena: string;
};

export type User = {
  pk: number;
  usuario: string;
  contrasena: string;
  inspector: number;
  token: string;
};

export type AuthState = {
  userData: User | null;
  setUserData: (data: User) => void;
  clearUserData: () => void;
};

export type BoundedState = AuthState;

export type formDataType = {
  BoxSelected: string;
  viewBox: string;
  startDate: string;
  endDate: string;
};

export type defectData = {
  folio: number;
  producto: string;
  defecto: string;
  zona: string;
  fecha_rechazo: string;
};

export type GroupedZoneData = {
  defecto: string;
  zona: string;
  total: number;
  folio: number;
};
