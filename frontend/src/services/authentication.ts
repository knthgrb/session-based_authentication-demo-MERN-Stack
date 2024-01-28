import axios from "axios";
import { User } from "../models/user.model";

// TYPE OF ERROR RESPONSE
export interface ErrorResponse {
  error: string;
}

// GET AUTH USER
export async function getAuthenticatedUser(): Promise<User> {
  const response = await axios.get("/api/users");
  return response.data;
}

// SIGNUP
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials) {
  const response = await axios.post("/api/users/signup", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// LOGIN
export interface LogInCredentials {
  username: string;
  password: string;
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
  const response = await axios.post("/api/users/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// LOGOUT
export async function logOut() {
  await axios.post("/api/users/logout");
}
