import { Request, Response } from "express";
import { cr, inserirSql, selecionarSql } from "./database";

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
    res.render("cadastroAeroporto");
  }
}

export async function visualizarAeroportos(req: Request, res: Response) {
  try {
    const selectSql = `SELECT * FROM AEROPORTOS`;

    const result = await selecionarSql(selectSql, [], "Aeroportos") as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idAeroporto: item[0],
        nomeAeroporto: item[1],
        cidade: item[2]
      }));
    };
    res.render("visualizarAeroporto", {aeroportos: dados});

  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
