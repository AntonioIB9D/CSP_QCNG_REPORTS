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
