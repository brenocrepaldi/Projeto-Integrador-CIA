import express from "express";
import { AeroportoController } from "../controllers/AeroportoController";
export const routerAeroporto = express.Router();

routerAeroporto.get("/cadastro/aeroporto", AeroportoController.createAeroporto);
routerAeroporto.post(
  "/cadastro/aeroporto",
  AeroportoController.createAeroportoSave
);
routerAeroporto.get("/visualizar/aeroporto", AeroportoController.showAeroporto);
routerAeroporto.get(
  "/editar/aeroporto/:id",
  AeroportoController.updateAeroporto
);
routerAeroporto.post(
  "/editar/aeroporto/:id",
  AeroportoController.updateAeroportoSave
);
routerAeroporto.post(
  "/excluir/aeroporto/:id",
  AeroportoController.removeAeroporto
);
