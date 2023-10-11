import { Request, Response } from "express";
import { cr, executaSql } from "./databasee";

export async function cadastroAeronave(
  modelo: string,
  numAssento: number,
  anoFabricacao: number,
  req: Request,
  res: Response
) {
  try {
    const sql = `INSERT INTO AERONAVES 
   (ID_AERONAVE, MODELO, ANOFABRICACAO, NUM_ASSENTO)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1, :2, :3)`;

    const dados = [modelo, numAssento, anoFabricacao];
    executaSql(sql, dados);
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroAeronave");
  }
}
