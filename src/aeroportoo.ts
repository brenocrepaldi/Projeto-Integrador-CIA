import { conn, executaSql } from "./databasee";
import { Request, Response } from "express";

export function cadastroAeroporto(req: Request, res: Response) {
  const aeroporto = req.body.aeroporto;
  const cidade = req.body.cidade;
  const sql = `insert into aeroporto (aeroporto, cidade) values ('${aeroporto}', '${cidade}');`;

  executaSql(sql);
}
export function visualizaAeroporto(req: Request, res: Response) {
  const sql =
    "select a.aeroporto, c.cidade from aeroporto a, cidade c where a.idcidade=c.idcidade";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeroportos = data;
    res.render("visualizarAeroporto", { aeroportos });
  });
}
