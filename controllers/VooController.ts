import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class VooController {
  static async createVoo(req: Request, res: Response) {
    const selectSql = `
    SELECT T.ID_TRECHO, A_SAIDA.NOME_AEROPORTO AS NOME_AEROPORTO_SAIDA, A_CHEGADA.NOME_AEROPORTO AS NOME_AEROPORTO_CHEGADA FROM TRECHO T JOIN AEROPORTO A_SAIDA ON T.ID_AEROPORTO_SAIDA = A_SAIDA.ID_AEROPORTO JOIN AEROPORTO A_CHEGADA ON T.ID_AEROPORTO_CHEGADA = A_CHEGADA.ID_AEROPORTO
  `;

    const result = (await retornarDados(
      selectSql,
      [],
      "Trechos"
    )) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idTrecho: item[0],
        aeroportoSaida: item[1],
        aeroportoChegada: item[2],
      }));
    }

    res.render("cadastro/cadastroVoo", { trechos: dados });
  }
  static async createVooSave(req: Request, res: Response) {
    const valor = req.body.valor;
    const horaSaida = req.body.horaSaida;
    const horaChegada = req.body.horaChegada;
    const dataSaida = req.body.dataSaida;
    const dataChegada = req.body.dataChagada;
    const idTrecho = req.body.idTrecho;
    try {
      let objeto = "Voo";
      const sql = `
        INSERT INTO VOO 
          (ID_VOO, VALOR, HORARIO_SAIDA, HORARIO_CHEGADA, ID_TRECHO)
        VALUES
          (SEQ_VOO.NEXTVAL, :1, :2, :3, :4)`;

      const dados = [valor, horaSaida, horaChegada, idTrecho];
      executarSql(sql, dados, objeto);
    } catch (e) {
      if (e instanceof Error) {
        cr.message = e.message;
        console.log(e.message);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      res.render("cadastro/cadastroVoo");
    }
  }
  static async showVoo(req: Request, res: Response) {
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
          idaeronave: item[5], //MUDAR
        }));
      }
      res.render("visualizar/visualizarVoo", { voos: dados });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    }
  }
  static async updateVoo(req: Request, res: Response) {}
  static async updateVooSave(req: Request, res: Response) {}
  static async removeVoo(req: Request, res: Response) {}
}
