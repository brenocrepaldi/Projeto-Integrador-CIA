import { Request, Response } from "express";
import { cr, executaSql } from "./database";

export async function cadastroAeroporto(
  aeroporto: string,
  cidade: string,
  req: Request,
  res: Response
) {
  try {
    const objeto = "Aeroporto";
    const sql = `
    INSERT INTO AEROPORTOS 
    (ID_AEROPORTO, NOME_AEROPORTO, CIDADE) 
    VALUES
    (SEQ_AEROPORTOS.NEXTVAL, :1, :2)
    `; // alterar as tabelas no banco

    const dados = [aeroporto, cidade];
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
    res.render("cadastroAeroporto");
  }
}
