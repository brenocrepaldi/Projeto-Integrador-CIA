import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class TrechoController {
  static async createTrecho(req: Request, res: Response) {
    const selectSql = `SELECT * FROM aeroporto`;

    const result = (await retornarDados(
      selectSql,
      [],
      "Aeroportos"
    )) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idAeroporto: item[0],
        aeroporto: item[1],
        cidade: item[2],
      }));
    }
    res.render("cadastro/cadastroTrecho", { aeroportos: dados });
  }
  static async createTrechoSave(req: Request, res: Response) {
    const idAeroportoSaida = req.body.idAeroportoSaida;
    const idAeroportoChegada = req.body.idAeroportoChegada;
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
      res.render("cadastro/cadastroTrecho");
    }
  }
}
