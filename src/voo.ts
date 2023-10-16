import { Request, Response } from "express";
import { cr, inserirSql, selecionarSql } from "./database";

export async function cadastroVoo(
  valor: number,
  horaSaida: string,
  horaChegada: string,
  idTrecho: number,
  req: Request,
  res: Response
) {
  try {
    let objeto = "Voo";
    const sql = `INSERT INTO VOO 
   (ID_VOO, VALOR, HORARIO_SAIDA, HORARIO_CHAGADA, ID_TRECHO, ID_AERONAVE)
   VALUES
   (SEQ_VOO.NEXTVAL, :1, :2, :3. :4. :5)`;

    const dados = [valor];
    inserirSql(sql, dados, objeto);
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroVoo");
  }
}

export async function visualizarVoos(req: Request, res: Response) {
  try {
    const selectSql = `SELECT * FROM VOO`;

    const result = (await selecionarSql(selectSql, [], "Voos")) as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idVoo: item[0],
        aeroportoSaida: item[1],
        aeroportoChegada: item[2],
        valor: item[3],
      }));
    }
    res.render("visualizarVoo", { voos: dados });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
}
