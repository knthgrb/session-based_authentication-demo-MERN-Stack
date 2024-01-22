import { User } from "../models/user.model";

//FETCH DATA FUNCTION
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// GET AUTH USER
export async function getAuthenticatedUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

//SIGNUP
export interface singUpCredentials {
  username: string;
  email: string;
  password: string;
}
export async function signUp(credentials: singUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

//LOGIN
export interface logInCredentials {
  username: string;
  password: string;
}

export async function logIn(credentials: logInCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

//LOGOUT
export async function logOut() {
  await fetchData("api/users/logout", {
    method: "POST",
  });
}
