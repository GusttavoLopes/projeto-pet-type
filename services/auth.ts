import api from "./api";
import { User, UserResponse } from "../ts/types";

async function signIn(user: User): Promise<UserResponse> {
  const { mail, password } = user;
  try {
    const { data } = await api.post("/user/login", { mail, password });
    console.log("Sign In Data", data);
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function userCreate(user: User): Promise<UserResponse> {
  const { mail, password } = user;
  try {
    const { data } = await api.post("/user/create", { mail, password });
    console.log("User Create Data", data);
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

export { signIn, userCreate };
