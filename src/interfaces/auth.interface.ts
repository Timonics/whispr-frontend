export interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  isActive?: boolean;
  access_token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  authIsLoading: boolean;
  myProfile: Partial<UserData>;
  registerUser: (registerData: Partial<AuthData>) => Promise<void>;
  loginUser: (loginData: Partial<AuthData>) => Promise<void>;
  checkIsAuthenticated: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

export interface AuthData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
