import express from "express";
import { AeronaveController } from "../controllers/AeronaveController";
export const routerAeronave = express.Router();

routerAeronave.get("/cadastro/aeronave", AeronaveController.createAeronave);
routerAeronave.post(
  "/cadastro/aeronave",
  AeronaveController.createAeronaveSave
);
routerAeronave.get("/visualizar/aeronave", AeronaveController.showAeronave);
routerAeronave.get("/editar/aeronave/:id", AeronaveController.updateAeronave);
routerAeronave.post(
  "/editar/aeronave/:id",
  AeronaveController.updateAeronaveSave
);
routerAeronave.post("/excluir/aeronave/:id", AeronaveController.removeAeronave);
