import { create } from "zustand";
import { User } from "../models/user.model";

interface StoreBody {
  user: User | null;
  setUser: (userData: User) => void;
}

export const useDataLayer = create<StoreBody>((set) => ({
  // GLOBAL DATA
  user: null,

  // GLOBALFUNCTIONS
  setUser: (userData: User) => set({ user: userData }),
}));
