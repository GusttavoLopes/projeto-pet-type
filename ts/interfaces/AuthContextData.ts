import { User, UserResponse } from "../types";
export interface AuthContextData {
  signIn: (user: User) => Promise<UserResponse>;
  signOut: () => Promise<void>;
  token: string;
  mail: string;
  loading: boolean;
  userCreate: (user: User) => Promise<UserResponse>;
}
