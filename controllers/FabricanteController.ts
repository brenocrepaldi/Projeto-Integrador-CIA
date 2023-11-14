import { Request, Response } from "express";
import { cr, executarSql, retornarDados, excluirDados } from "../db/database";

export class FabricanteController {
  static createFabricante(req: Request, res: Response) {
    res.render("cadastro/cadastrofabricante");
  }
  static async createFabricanteSave(req: Request, res: Response) {
    const fabricante = req.body.fabricante;
    try {
      let objeto = "Fabricante";

      const sql = `
      INSERT INTO FABRICANTE 
        (ID_FABRICANTE, NOME_FABRICANTE)
      VALUES
        (SEQ_FABRICANTE.NEXTVAL, :1)
      `;

      const dados = [fabricante];

      if (await executarSql(sql, dados, objeto)) {
        res.render("modal");
      }
    } catch (e) {
      if (e instanceof Error) {
        cr.message = e.message;
        console.log(e.message);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      console.log(cr);
      res.render("cadastro/cadastroFabricante");
    }
  }
  static async showFabricante(req: Request, res: Response) {
    try {
      const selectSql = `SELECT * FROM FABRICANTE ORDER BY ID_FABRICANTE`;

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

      res.render("visualizar/visualizarFabricante", { fabricantes: dados });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    }
  }
  static async updateFabricante(req: Request, res: Response) {
    const idFabricante = req.params.id;

    const sql = `SELECT * FROM FABRICANTE WHERE ID_FABRICANTE = '${idFabricante}'`;

    const result = (await retornarDados(sql, [], "Fabricantes")) as string[][];

    let dados;

    if (result) {
      dados = result.map((item) => ({
        idFabricante: item[0],
        nomeFabricante: item[1],
      }));
    }

    res.render("editar/editFabricante", { fabricante: dados });
  }
  static async updateFabricanteSave(req: Request, res: Response) {
    const fabricante = req.body.fabricante;
    const idFabricante = req.params.id;
    console.log(typeof idFabricante, typeof fabricante);

    const sql = `
  UPDATE FABRICANTE
    SET NOME_FABRICANTE = '${fabricante}'
  WHERE 
      ID_FABRICANTE = ${idFabricante}
  `;

    console.log(sql);

    executarSql(sql, [], "Fabricantes");

    res.redirect("/visualizar/fabricante");
  }
  static async removeFabricante(req: Request, res: Response) {
    const idFabricante = req.params.id;
    const sql = `DELETE FROM FABRICANTE WHERE ID_FABRICANTE='${idFabricante}'`;

    try {
      await excluirDados(sql);
    } catch (error) {
      res
        .status(500)
        .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    } finally {
      res.redirect("/visualizar/fabricante");
    }
  }
}
