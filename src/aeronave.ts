import { Request, Response } from "express";
import { cr, executaSql, selecionarSql } from "./database";

export async function cadastroAeronave(
  modelo: string,
  numAssento: number,
  anoFabricacao: number,
  registro: string,
  status: string,
  idFabricante: string,
  req: Request,
  res: Response
) {
  try {
    const objeto = "Aeronave";
    const sql = `INSERT INTO AERONAVE 
   (ID_AERONAVE, MODELO, NUM_ASSENTO,REGISTRO,STATUS,ANO_FABRICACAO,ID_FABRICANTE )
   VALUES
   (SEQ_AERONAVE.NEXTVAL, :1, :2, :3,:4,:5,:6)`;

    const dados = [
      modelo,
      numAssento,
      registro,
      status,
      anoFabricacao,
      idFabricante,
    ];
    executaSql(sql, dados, objeto);
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
    const selectSql = `
    SELECT A.ID_AERONAVE, A.MODELO, A.NUM_ASSENTO, A.REGISTRO, A.STATUS, A.ANO_FABRICACAO, F.NOME_FABRICANTE FROM  AERONAVE A, FABRICANTE F WHERE A.ID_FABRICANTE = F.ID_FABRICANTE ORDER BY A.ID_AERONAVE`;

    const result = (await selecionarSql(
      selectSql,
      [],
      "Aeronaves"
    )) as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idAeronave: item[0],
        modelo: item[1],
        numassento: item[2],
        registro: item[3],
        status: item[4],
        anoFabricacao: item[5],
        fabricante: item[6],
      }));
    }

    res.render("visualizarAeronave", { aeronaves: dados });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
