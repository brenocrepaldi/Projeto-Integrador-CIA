import { conn, executaSql } from "./databasee";
import { Request, Response } from "express";

export function cadastroFabricante(req: Request, res: Response) {
  const fabricante = req.body.fabricante; //pegando os dados do input fabricante no body

  const sql = `insert into fabricante (fabricante) values ('${fabricante}');`;
  executaSql(sql);
}
export function visualizarFabricante(req: Request, res: Response) {
  const sql = `select * from fabricante`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricantes = data;
    res.render("visualizarFabricante", { fabricantes }); //passando a pagina e os dados
  });
}

export function excluirFabricante() {}
