import express from "express";
import { FabricanteController } from "../controllers/FabricanteController";
export const routerFabricante = express.Router();

routerFabricante.get(
  "/cadastro/fabricante",
  FabricanteController.createFabricante
);
routerFabricante.post(
  "/cadastro/fabricante",
  FabricanteController.createFabricanteSave
);
routerFabricante.get(
  "/visualizar/fabricante",
  FabricanteController.showFabricante
);
routerFabricante.get(
  "/editar/fabricante/:id",
  FabricanteController.updateFabricante
);
routerFabricante.post(
  "/editar/fabricante/:id",
  FabricanteController.updateFabricanteSave
);
routerFabricante.post(
  "/excluir/fabricante/:id",
  FabricanteController.removeFabricante
);
