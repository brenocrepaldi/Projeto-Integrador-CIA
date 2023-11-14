import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class VooController {
  static async createVoo(req: Request, res: Response) {
    const sql = `
    SELECT T.ID_TRECHO, A_SAIDA.NOME_AEROPORTO AS NOME_AEROPORTO_SAIDA, A_CHEGADA.NOME_AEROPORTO AS NOME_AEROPORTO_CHEGADA  FROM TRECHO T JOIN AEROPORTO A_SAIDA ON T.ID_AEROPORTO_SAIDA = A_SAIDA.ID_AEROPORTO JOIN AEROPORTO A_CHEGADA ON T.ID_AEROPORTO_CHEGADA = A_CHEGADA.ID_AEROPORTO
  `;
    const sql2 = "SELECT ID_AERONAVE, REGISTRO FROM AERONAVE";
    const result = (await retornarDados(sql, [], "Trechos")) as string[][];
    const result2 = (await retornarDados(sql2, [], "Aeronave")) as string[][];

    let dados, dados2;

    if (result) {
      dados = result.map((item) => ({
        idTrecho: item[0],
        aeroportoSaida: item[1],
        aeroportoChegada: item[2],
      }));
    }
    if (result2) {
      dados2 = result2.map((item) => ({
        idAeronave: item[0],
        registro: item[1],
      }));
    }
    res.render("cadastro/cadastroVoo", { trechos: dados, aeronaves: dados2 });
  }
  static async createVooSave(req: Request, res: Response) {
    const valor = req.body.valor;
    const horaSaida = req.body.horaSaida;
    const horaChegada = req.body.horaChegada;
    const dataSaida = req.body.dataSaida;
    const dataChegada = req.body.dataChegada;
    const idTrecho = req.body.idTrecho;
    const id_aeronave = req.body.idAeronave;

    try {
      let objeto = "Voo";
      const sql = `
        INSERT INTO VOO 
          (ID_VOO, VALOR, HORARIO_SAIDA, HORARIO_CHEGADA, ID_TRECHO, ID_AERONAVE)
        VALUES
          (SEQ_VOO.NEXTVAL, :1, TO_DATE(:2, 'YYYY-MM-DD HH24:MI'), TO_DATE(:3, 'YYYY-MM-DD HH24:MI'), :4, :5)`;

      const dados = [
        valor,
        dataSaida + " " + horaSaida.toString(),
        dataChegada + " " + horaChegada.toString(),
        idTrecho,
        id_aeronave,
      ];
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
      const selectSql = `SELECT * FROM VOO  w`;

      const result = (await retornarDados(selectSql, [], "Voos")) as string[][];

      let dados;
      if (result) {
        dados = result.map((item) => ({
          idVoo: item[0],
          valor: item[1],
          horaSaida: item[2],
          horaChegada: item[3],
          idTrecho: item[4],
          idAeronave: item[5],
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
  static async updateVoo(req: Request, res: Response) {
    const idVoo = req.params.id;

    try {
      const sqlVoo = `SELECT * FROM VOO WHERE ID_VOO = ${idVoo}`;
      const sqlAeronave = "SELECT ID_AERONAVE, REGISTRO FROM AERONAVE";
      const sqlTrecho = `
    SELECT T.ID_TRECHO, A_SAIDA.NOME_AEROPORTO AS NOME_AEROPORTO_SAIDA, A_CHEGADA.NOME_AEROPORTO AS NOME_AEROPORTO_CHEGADA  FROM TRECHO T JOIN AEROPORTO A_SAIDA ON T.ID_AEROPORTO_SAIDA = A_SAIDA.ID_AEROPORTO JOIN AEROPORTO A_CHEGADA ON T.ID_AEROPORTO_CHEGADA = A_CHEGADA.ID_AEROPORTO
  `;
      const resultVoo = (await retornarDados(
        //dados da parte do voo
        sqlVoo,
        [],
        "Voos"
      )) as string[][];

      const resultTrecho = (await retornarDados(
        sqlTrecho,
        [],
        "Trechos"
      )) as string[][];

      const resultAeronave = (await retornarDados(
        sqlAeronave,
        [],
        "Aeronaves"
      )) as string[][];

      let dadosVoo, dadosTrechos, dadosAeronaves;

      if (resultVoo) {
        dadosVoo = resultVoo.map((item) => ({
          idVoo: item[0],
          valor: item[1],
          horario_saida: item[2],
          horario_chegada: item[3],
          idTrecho: item[4],
          idAeronave: item[5],
        }));
      }
      if (resultTrecho) {
        dadosTrechos = resultTrecho.map((item) => ({
          idTrecho: item[0],
          aeroportoSaida: item[1],
          aeroportoChegada: item[2],
        }));
      }
      if (resultAeronave) {
        dadosAeronaves = resultAeronave.map((item) => ({
          idAeronave: item[0],
          registro: item[1],
        }));
      }
      res.render("editar/editVoo", {
        voos: dadosVoo,
        trechos: dadosTrechos,
        aeronaves: dadosAeronaves,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async updateVooSave(req: Request, res: Response) {
    const idVoo = req.params.id;
    const valor = req.body.valor;
    const dataSaida = req.body.dataSaida;
    const horaSaida = req.body.horaSaida;
    const dataChegada = req.body.dataChegada;
    const horaChegada = req.body.horaChegada;
    const idTrecho = req.body.idTrecho;
    const idAeronave = req.body.idAeronave;

    console.log(valor);
    const sql = `
  UPDATE VOO
  SET VALOR = '${valor}',
      HORARIO_SAIDA = TO_DATE('${dataSaida} ${horaSaida}', 'YYYY-MM-DD HH24:MI'),
      HORARIO_CHEGADA = TO_DATE('${dataChegada} ${horaChegada}', 'YYYY-MM-DD HH24:MI'),
      ID_TRECHO = ${idTrecho},
      ID_AERONAVE = ${idAeronave}
  WHERE ID_VOO = ${idVoo}
`;

    executarSql(sql, [], "Voos");

    res.redirect("/visualizar/voo");
  }
  static async removeVoo(req: Request, res: Response) {
    const idVoo = req.params.id;

    const sql = `DELETE FROM VOO WHERE ID_VOO='${idVoo}'`;

    try {
      await excluirDados(sql);
    } catch (error) {
      res
        .status(500)
        .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    } finally {
      res.redirect("/visualizar/voo");
    }
  }
}
