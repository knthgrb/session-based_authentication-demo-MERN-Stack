import express from "express";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.logIn);

router.post("/logout", UserController.logOut);

export default router;
