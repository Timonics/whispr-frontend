import { create } from "zustand";
import type { UserData } from "../interfaces/auth.interface";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  userData: null,
  setUserData: (data: UserData | null) => set({ userData: data }),
}));

export default useAuthStore;
