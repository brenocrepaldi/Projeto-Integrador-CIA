import { Request, Response } from "express";
import { retornarDados } from "../db/database";

export class HomeController {
  static async showDados(req: Request, res: Response) {
    const selectSql = `SELECT
  (SELECT COUNT(ID_FABRICANTE) FROM FABRICANTE),
  (SELECT COUNT(ID_AERONAVE) FROM AERONAVE),
  (SELECT COUNT(ID_VOO) FROM VOO),
  (SELECT COUNT(ID_TRECHO) FROM TRECHO),
  (SELECT COUNT(ID_AEROPORTO) FROM AEROPORTO)
   FROM DUAL`;

    const result = (await retornarDados(selectSql, [], "Dados")) as string[][];

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
    res.render("home", { quantidade: dados });
  }
}
