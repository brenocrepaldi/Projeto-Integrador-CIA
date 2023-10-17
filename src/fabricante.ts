import { Request, Response } from "express";
import { cr, executaSql, selecionarSql } from "./database";

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
    console.log(cr);
    res.render("cadastroFabricante");
  }
}

export async function visualizarFabricante(req: Request, res: Response) {
  try {
    const selectSql = `SELECT * FROM FABRICANTE ORDER BY ID_FABRICANTE`;

    const result = (await selecionarSql(
      selectSql,
      [],
      "Fabricantes"
    )) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idFabricante: item[0],
        nomeFabricante: item[1],
      }));
    }

    res.render("visualizarFabricante", { fabricantes: dados });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
