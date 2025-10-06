import type { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../Types/types";

export type AuthSliceType = {
  userData: User | null;
  setUserData: (data: User) => void;
  clearUserData: () => void;
};

export const UserLoginSlice: StateCreator<
  AuthSliceType,
  [],
  [["zustand/persist", AuthSliceType]]
> = persist(
  (set) => ({
    userData: null as AuthSliceType["userData"],
    setUserData: (data: AuthSliceType["userData"]) => set({ userData: data }),
    clearUserData: () => set({ userData: null }),
  }),
  { name: "userData" }
);
