import { Request, Response } from "express";
import { cr, executaSql } from "./database";

export async function cadastroFabricante(
  fabricante: string,
  req: Request,
  res: Response
) {
  try {
    let objeto = "Fabricante";

    const sql = `INSERT INTO FABRICANTE 
   (ID_FABRICANTE, NOME_FABRICANTE)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`;

    const dados = [fabricante];
    executaSql(sql, dados, objeto);
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroFabricante");
  }
}
