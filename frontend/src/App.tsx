import React, { useEffect } from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import AppRoutes from "./Routes";
import * as UserApi from "./services/authentication";
import { useDataLayer } from "./store/useDataLayer";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  const { setUser } = useDataLayer();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const authUser = await UserApi.getAuthenticatedUser();
        if (authUser) {
          setUser(authUser);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<UserApi.ErrorResponse>;
          console.error(axiosError);
        }
      }
    };
    getAuthUser();
  }, [setUser]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
