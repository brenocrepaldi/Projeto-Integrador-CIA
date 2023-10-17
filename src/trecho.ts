import { Request, Response } from "express";
import { cr, executarSql } from "./database";

export async function cadastroTrecho(
  idAeroportoSaida: number,
  idAeroportoChegada: number,
  req: Request,
  res: Response
) {
  try {
    let objeto = "Trecho";

    const sql = `
    INSERT INTO TRECHO
      (ID_TRECHO, ID_AEROPORTO_SAIDA, ID_AEROPORTO_CHEGADA)
    VALUES
      (SEQ_TRECHO.NEXTVAL, :1, :2)`;

    const dados = [idAeroportoSaida, idAeroportoChegada];
    console.log(dados);
    executarSql(sql, dados, objeto);
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroTrecho");
  }
}
