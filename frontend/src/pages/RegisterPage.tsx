import React, { useState } from "react";
import * as UserApi from "../services/authentication";
import { Link } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  // FUNCTION COMPONENT TO RENDER THE ERROR MESSAGE
  const renderErrorMessage = (message: string) => {
    return <p className="ml-1 text-[0.9rem] text-red-500">{message}</p>;
  };

  // API CALL
  const register = async (credentials: UserApi.SignUpCredentials) => {
    try {
      await UserApi.signUp(credentials);
      window.location.reload();
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<UserApi.ErrorResponse>;
        setErrorMessage(axiosError.response?.data?.error);
      }
    }
  };

  // HANDLE SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = { username, email, password };
    await register(credentials);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-md border border-slate-300 p-4">
        <h1 className="mb-4 text-center text-[1.5rem] font-bold text-blue-500">
          Sign Up
        </h1>
        <form className="flex w-[24rem] flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
          />
          {/* RENDERS ERROR MESSAGE */}
          {errorMessage &&
            errorMessage.toLowerCase().includes("username") &&
            renderErrorMessage(errorMessage)}
          <input
            type="email"
            required
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
          />
          {/* RENDERS ERROR MESSAGE */}
          {errorMessage &&
            errorMessage.toLowerCase().includes("email") &&
            renderErrorMessage(errorMessage)}
          <input
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="h-10 rounded-md bg-blue-500 text-white"
          >
            Register
          </button>
        </form>
        <div className="mt-4 flex items-center justify-center gap-2">
          <p className="text-[0.9rem]">Already have an account? </p>
          <Link to="/login" className="text-[0.9rem] text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
