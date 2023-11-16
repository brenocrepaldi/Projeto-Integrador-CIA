import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class AeronaveController {
  static async createAeronave(req: Request, res: Response) {
    const selectSql = `SELECT * FROM FABRICANTE`;

    const result = (await retornarDados(
      selectSql,
      [],
      "Fabricantes"
    )) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idFabricante: item[0],
        nomeFabricante: item[1],
      }));
    }

    res.render("cadastro/cadastroAeronave", { fabricante: dados });
  }
  static async createAeronaveSave(req: Request, res: Response) {
    const modelo = req.body.modelo;
    const numAssento = req.body.numAssento;
    const anoFabricacao = req.body.anoFabricacao;
    const registro = req.body.registro;
    const status = req.body.status;
    const idFabricante = req.body.idFabricante;
    try {
      const objeto = "Aeronave";
      const sql = `INSERT INTO AERONAVE 
       (ID_AERONAVE, MODELO, NUM_ASSENTO,REGISTRO,STATUS,ANO_FABRICACAO,ID_FABRICANTE )
       VALUES
       (SEQ_AERONAVE.NEXTVAL, :1, :2, :3,:4,:5,:6)`;

      const dados = [
        modelo,
        numAssento,
        registro,
        status,
        anoFabricacao,
        idFabricante,
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
      console.log(cr);
      res.render("cadastro/cadastroAeronave");
    }
  }
  static async showAeronave(req: Request, res: Response) {
    try {
      const selectSql = `
        SELECT A.ID_AERONAVE, A.MODELO, A.NUM_ASSENTO, A.REGISTRO, A.STATUS, A.ANO_FABRICACAO, F.NOME_FABRICANTE FROM  AERONAVE A, FABRICANTE F WHERE A.ID_FABRICANTE = F.ID_FABRICANTE ORDER BY A.ID_AERONAVE`;

      const result = (await retornarDados(
        selectSql,
        [],
        "Aeronaves"
      )) as string[][];

      let dados;
      if (result) {
        dados = result.map((item) => ({
          idAeronave: item[0],
          modelo: item[1],
          numassento: item[2],
          registro: item[3],
          status: item[4],
          anoFabricacao: item[5],
          fabricante: item[6],
        }));
      }

      res.render("visualizar/visualizarAeronave", { aeronaves: dados });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    }
  }
  static async updateAeronave(req: Request, res: Response) {
    const idAeronave = req.params.id;

    try {
      const aeronaveSql = `SELECT ID_AERONAVE, MODELO, NUM_ASSENTO, REGISTRO, STATUS, ANO_FABRICACAO FROM AERONAVE WHERE ID_AERONAVE = ${idAeronave}`;
      const fabricanteSql = `SELECT * FROM FABRICANTE`;

      const resultAeronave = (await retornarDados(
        aeronaveSql,
        [],
        "Aeronaves"
      )) as string[][];
      const resultFabricantes = (await retornarDados(
        fabricanteSql,
        [],
        "Fabricantes"
      )) as string[][];

      let dadosAeronave;
      let dadosFabricantes;

      if (resultAeronave) {
        dadosAeronave = resultAeronave.map((item) => ({
          idAeronave: item[0],
          modelo: item[1],
          numassento: item[2],
          registro: item[3],
          status: item[4],
          anoFabricacao: item[5],
        }));
      }
      if (resultFabricantes) {
        dadosFabricantes = resultFabricantes.map((item) => ({
          idFabricante: item[0],
          nomeFabricante: item[1],
        }));
      }

      res.render("editar/editAeronave", {
        aeronaves: dadosAeronave,
        fabricantes: dadosFabricantes,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async updateAeronaveSave(req: Request, res: Response) {
    const idAeronave = req.params.id;
    const [modelo, numAssento, anoFabricacao, registro, status, idfabricante] =
      req.body;

    const sql = `
    UPDATE AERONAVE
      SET MODELO = '${modelo}',
      NUM_ASSENTO = ${numAssento},
      REGISTRO = '${registro}',
      STATUS = '${status}',
      ANO_FABRICACAO = ${anoFabricacao},
      ID_FABRICANTE = ${idfabricante}
    WHERE 
      ID_AERONAVE = ${idAeronave}
    `;

    executarSql(sql, [], "Aeronaves");

    res.redirect("/visualizar/aeronave");
  }
  static async removeAeronave(req: Request, res: Response) {
    const idAeronave = req.params.id;
    const sql = `DELETE FROM AERONAVE WHERE ID_AERONAVE = '${idAeronave}'`;

    try {
      await excluirDados(sql);
    } catch (error) {
      res
        .status(500)
        .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    } finally {
      res.redirect("/visualizar/aeronave");
    }
  }
}
