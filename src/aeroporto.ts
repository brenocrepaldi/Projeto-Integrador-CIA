import { Request, Response } from "express";
import { cr, executaSql, selecionarSql } from "./database";

export async function cadastroAeroporto(
  aeroporto: string,
  cidade: string,
  req: Request,
  res: Response
) {
  try {
    const objeto = "Aeroporto";
    const sql = `
    INSERT INTO AEROPORTO
    (ID_AEROPORTO, NOME_AEROPORTO, ID_CIDADE) 
    VALUES
    (SEQ_AEROPORTO.NEXTVAL, :1, :2)
    `;

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

export async function visualizarAeroportos(req: Request, res: Response) {
  try {
    const selectSql = `SELECT A.ID_AEROPORTO, A.NOME_AEROPORTO, C.NOME_CIDADE FROM AEROPORTO A, CIDADE C WHERE A.ID_CIDADE = C.ID_CIDADE ORDER BY A.ID_AEROPORTO`;

    const result = (await selecionarSql(
      selectSql,
      [],
      "Aeroportos"
    )) as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idAeroporto: item[0],
        nomeAeroporto: item[1],
        cidade: item[2],
      }));
    }
    res.render("visualizarAeroporto", { aeroportos: dados });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
