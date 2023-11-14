import express from "express";
import { VooController } from "../controllers/VooController";
export const routerVoo = express.Router();

routerVoo.get("/cadastro/voo", VooController.createVoo);
routerVoo.post("/cadastro/voo", VooController.createVooSave);
routerVoo.get("/visualizar/voo", VooController.showVoo);
routerVoo.get("/editar/voo/:id", VooController.updateVoo);
routerVoo.post("/editar/voo/:id", VooController.updateVooSave);
routerVoo.post("/excluir/voo/:id", VooController.removeVoo);
