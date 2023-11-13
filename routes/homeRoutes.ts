import express from "express";
import { HomeController } from "../controllers/HomeController";
export const routerHome = express.Router();

routerHome.get("/dashboard", HomeController.showDados);
