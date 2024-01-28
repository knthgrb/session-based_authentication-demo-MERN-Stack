import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/home" index element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
