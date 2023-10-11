import { Request, Response } from "express";
import { cr, executaSql } from "./database";

export async function cadastroTrecho(
  AeroportoSaida: string,
  AeroportoChegada: string,
  req: Request,
  res: Response
) {
  try {
    let objeto = "Trecho";

    const sql = ``;

    const dados = [AeroportoSaida, AeroportoChegada];
    executaSql(sql, dados, objeto);
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
