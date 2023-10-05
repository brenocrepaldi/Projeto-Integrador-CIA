import { RowDataPacket } from "mysql2";
import { conn, executaSql } from "./databasee";
import { Request, Response } from "express";

export function cadastroAeronave(req: Request, res: Response) {
  const modelo = req.body.modelo;
  const anoFabricacao = req.body.anoFabricacao;
  const numAssento = req.body.numAssento;
  const fabricante = req.body.idFabricante; //pegando o valor do select = nome do fabricante
  const sqlFabricante = `select idfabricante from fabricante where fabricante='${fabricante}'`; //sql para pegar o idfabricante de acordo com o nome retornado do select
  conn.query(sqlFabricante, (err, data: RowDataPacket[]) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length > 0) {
        const idFabricante = data[0].idfabricante; //pegando o idfabricante do data
        const sql = `insert into aeronave (modelo,numassento,anofabricacao,idfabricante) values('${modelo}','${numAssento}','${anoFabricacao}','${idFabricante}');`;
        executaSql(sql);
      }
    }
  });
}
export function visualizaAeronave(req: Request, res: Response) {
  const sql = `select * from aeronave a, fabricante f where a.idfabricante=f.idfabricante `;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeronaves = data;
    res.render("visualizarAeronave", { aeronaves });
  });
}
