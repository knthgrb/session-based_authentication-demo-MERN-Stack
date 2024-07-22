import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserApi from "../services/authentication";
import { isAxiosError, AxiosError } from "axios";
import { useDataLayer } from "../store/useDataLayer";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const navigate = useNavigate();

  const { user, setUser } = useDataLayer();

  // FUNCTION COMPONENT TO RENDER THE ERROR MESSAGE
  const renderErrorMessage = (message: string) => {
    return <p className="ml-1 text-[0.9rem] text-red-500">{message}</p>;
  };

  // API CALL
  const login = async (credentials: UserApi.LogInCredentials) => {
    try {
      const userInfo = await UserApi.logIn(credentials);
      setUser(userInfo);
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
    const credentials: UserApi.LogInCredentials = { username, password };
    await login(credentials);
  };

  // REDIRECT IF THERE IS USER
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-md border border-slate-300 p-4">
        <h1 className="mb-4 text-center text-[1.5rem] font-bold text-blue-500">
          Sign In
        </h1>
        <form className="flex w-[24rem] flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            required
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          />
          <button
            type="submit"
            className="h-10 rounded-md bg-blue-500 text-white"
          >
            Login
          </button>
          {errorMessage && renderErrorMessage(errorMessage)}
        </form>
        <div className="mt-4 flex items-center justify-center gap-2">
          <p className="text-[0.9rem]">Don't have an account? </p>
          <Link to="/signup" className="text-[0.9rem] text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
