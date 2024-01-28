import React, { useEffect } from "react";
import axios, { isAxiosError, AxiosError } from "axios";
import AppRoutes from "./Routes";
import { useDataLayer } from "./store/useDataLayer";
import * as UserApi from "./services/authentication.ts";

axios.defaults.baseURL = "http://localhost:5000";

const App: React.FC = () => {
  const { user, setUser } = useDataLayer();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const authUser = await UserApi.getAuthenticatedUser();
        setUser(authUser);
        console.log(user);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<UserApi.ErrorResponse>;
          console.log(axiosError);
        }
      }
    };

    getAuthUser();
  }, [setUser, user]);
  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
