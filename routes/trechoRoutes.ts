import express from "express";
import { TrechoController } from "../controllers/TrechoController";
export const routerTrecho = express.Router();

routerTrecho.get("/cadastro/trecho", TrechoController.createTrecho);
routerTrecho.post("/cadastro/trecho", TrechoController.createTrechoSave);
