import { Request, Response } from "express";
import { cr, inserirSql, selecionarSql } from "./database";

export async function cadastroAeronave(
  modelo: string,
  numAssento: number,
  anoFabricacao: number,
  req: Request,
  res: Response
) {
  try {
    const objeto = "Aeronave";
    const sql = `INSERT INTO AERONAVES 
   (ID_AERONAVE, MODELO, ANOFABRICACAO, NUM_ASSENTO)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1, :2, :3)`;

    const dados = [modelo, numAssento, anoFabricacao];
    inserirSql(sql, dados, objeto);
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    console.log(cr);
    res.render("cadastroAeronave");
  }
}

export async function visualizarAeronaves(req: Request, res: Response) {
  try {
    const selectSql = `SELECT * FROM AERONAVES`;

    const result = await selecionarSql(selectSql, [], "Aeronaves") as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idaeronave: item[0],
        modelo: item[1],
        anofabricacao: item[2],
        numassento: item[3],
      }));
    };
    res.render("visualizarAeronave", {aeronaves: dados});

  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
