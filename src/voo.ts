import { Request, Response } from "express";
import { cr, retornarDados, executarSql } from "./database";

export async function cadastroVoo(
  valor: number,
  timestampSaida: string,
  timestampChegada: string,
  idTrecho: number,
  idAeronave: number,
  req: Request,
  res: Response
) {
  try {
    const sql = `
    INSERT INTO VOO 
      (ID_VOO, VALOR, HORARIO_SAIDA, HORARIO_CHEGADA, ID_TRECHO, ID_AERONAVE)
    VALUES
      (SEQ_VOO.NEXTVAL, :1, TO_DATE(:2), TO_DATE(:3), :4, :5)`;

    const dados = [valor, timestampSaida, timestampChegada, idTrecho, idAeronave];
    executarSql(sql, dados, "Voo");
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

    const result = (await retornarDados(selectSql, [], "Voos")) as string[][];

    let dados;
    if (result) {
      dados = result.map((item) => ({
        idVoo: item[0],
        valor: item[1],
        horaSaida: item[2],
        horaChegada: item[3],
        idTrecho: item[4],
        idaeronave: item[5],    //MUDAR
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
