import { Request, Response } from "express";
import { cr, selecionarSql, executaSql } from "./database";

export async function cadastroVoo(
  valor: number,
  horaSaida: string,
  horaChegada: string,
  dataSaida: string,
  dataChegada: string,
  idTrecho: number,
  req: Request,
  res: Response
) {
  try {
    let objeto = "Voo";
    const sql = `
    INSERT INTO VOO 
      (ID_VOO, VALOR, HORARIO_SAIDA, HORARIO_CHEGADA, ID_TRECHO)
    VALUES
      (SEQ_VOO.NEXTVAL, :1, :2, :3, :4)`;

    const dados = [valor, horaSaida, horaChegada, idTrecho];
    executaSql(sql, dados, objeto);
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
