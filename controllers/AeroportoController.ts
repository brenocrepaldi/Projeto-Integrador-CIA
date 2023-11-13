import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class AeroportoController {
  static async createAeroporto(req: Request, res: Response) {
    const selectSql = `SELECT * FROM cidade`;

    const result = (await retornarDados(
      selectSql,
      [],
      "Cidades"
    )) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idCidade: item[0],
        cidade: item[1],
      }));
    }
    res.render("cadastro/cadastroAeroporto", { cidades: dados });
  }
  static async createAeroportoSave(req: Request, res: Response) {
    const aeroporto = req.body.aeroporto;
    const cidade = req.body.idCidade;
    try {
      const objeto = "Aeroporto";
      const sql = `
      INSERT INTO AEROPORTO
      (ID_AEROPORTO, NOME_AEROPORTO, ID_CIDADE) 
      VALUES
      (SEQ_AEROPORTO.NEXTVAL, :1, :2)
      `;

      const dados = [aeroporto, cidade];
      executarSql(sql, dados, objeto);
    } catch (e) {
      if (e instanceof Error) {
        cr.message = e.message;
        console.log(e.message);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      console.log(cr);
      res.render("cadastro/cadastroAeroporto");
    }
  }
  static async showAeroporto(req: Request, res: Response) {
    try {
      const selectSql = `SELECT A.ID_AEROPORTO, A.NOME_AEROPORTO, C.NOME_CIDADE FROM AEROPORTO A, CIDADE C WHERE A.ID_CIDADE = C.ID_CIDADE ORDER BY A.ID_AEROPORTO`;

      const result = (await retornarDados(
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
      res.render("visualizar/visualizarAeroporto", { aeroportos: dados });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    }
  }
  static async updateAeroporto(req: Request, res: Response) {
    const idAeroporto = req.params.id;

    try {
      const aeroportoSql = `SELECT * FROM AEROPORTO WHERE ID_AEROPORTO = ${idAeroporto}`;
      const cidadeSql = `SELECT * FROM CIDADE`;

      const resultAeroporto = (await retornarDados(
        aeroportoSql,
        [],
        "Aeroportos"
      )) as string[][];
      const resultCidades = (await retornarDados(
        cidadeSql,
        [],
        "Cidades"
      )) as string[][];

      let dadosAeroporto;
      let dadosCidades;

      if (resultAeroporto) {
        dadosAeroporto = resultAeroporto.map((item) => ({
          idAeroporto: item[0],
          aeroporto: item[1],
          idCidade: item[2],
        }));
      }
      if (resultCidades) {
        dadosCidades = resultCidades.map((item) => ({
          idCidade: item[0],
          cidade: item[1],
        }));
      }

      res.render("editar/editAeroporto", {
        aeroportos: dadosAeroporto,
        cidades: dadosCidades,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async updateAeroportoSave(req: Request, res: Response) {
    const idAeroporto = req.params.id;
    const aeroporto = req.body.aeroporto;
    const idCidade = req.body.idCidade;

    const sql = `
  UPDATE AEROPORTO
    SET NOME_AEROPORTO = '${aeroporto}',
        ID_CIDADE = ${idCidade}
  WHERE 
      ID_AEROPORTO = ${idAeroporto}
  `;

    executarSql(sql, [], "Aeroportos");

    res.redirect("/visualizar/aeroporto");
  }
  static async removeAeroporto(req: Request, res: Response) {
    const idAeroporto = req.params.id;
    const sql = `DELETE FROM AEROPORTO WHERE ID_AEROPORTO='${idAeroporto}'`;

    try {
      await excluirDados(sql);
    } catch (error) {
      console.log(error);
    } finally {
      res.redirect("/visualizar/aeroporto");
    }
  }
}
