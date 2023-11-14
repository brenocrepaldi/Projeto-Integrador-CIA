import { Request, Response } from "express";
import { cr, retornarDados } from "../db/database";

export class HomeController {
  static async showDados(req: Request, res: Response) {
    try {
      const selectSql = `SELECT
     (SELECT COUNT(ID_FABRICANTE) FROM FABRICANTE),
     (SELECT COUNT(ID_AERONAVE) FROM AERONAVE),
     (SELECT COUNT(ID_VOO) FROM VOO),
     (SELECT COUNT(ID_TRECHO) FROM TRECHO),
     (SELECT COUNT(ID_AEROPORTO) FROM AEROPORTO)
      FROM DUAL`;

      const result = (await retornarDados(
        selectSql,
        [],
        "Dados"
      )) as string[][];

      let dados;

      if (result) {
        dados = result.map((item) => ({
          qtdeFabricante: item[0],
          qtdeAeronave: item[1],
          qtdeVoo: item[2],
          qtdeTrecho: item[3],
          qtdeAeroporto: item[4],
        }));
      }
      const selectSql2 = `SELECT * FROM VOO ORDER BY ID_VOO DESC FETCH FIRST 5 ROWS ONLY`;

      const result2 = (await retornarDados(
        selectSql2,
        [],
        "Voos"
      )) as string[][];

      let dados2;
      if (result2) {
        dados2 = result2.map((item) => ({
          idVoo: item[0],
          valor: item[1],
          horaSaida: item[2],
          horaChegada: item[3],
          idTrecho: item[4],
          idAeronave: item[5],
        }));
      }
      res.render("home", { voos: dados2, quantidade: dados });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    }
  }
}
