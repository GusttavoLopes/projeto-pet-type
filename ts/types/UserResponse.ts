import { User } from "../types";

export type UserResponse = {
  mail?: string;
  token?: string;
  user?: User;
  error?: string;
};
