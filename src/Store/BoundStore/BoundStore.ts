import { create } from "zustand";
import { UserLoginSlice } from "../Slice/authSlice";
import type { BoundedState } from "../../Types/types";

export const useBoundStore = create<BoundedState>((...a) => ({
  ...UserLoginSlice(...a),
}));
