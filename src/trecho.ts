import oracledb, { Connection, ConnectionAttributes, Result } from "oracledb";
import express, { Request, Response } from "express";
export type CustomResponse = {
  status: string;
  message: string;
  payload: any;
};

export async function cadastroTrecho(
  AeroportoSaida:string, 
  AeroportoChegada:string, 
  req:Request, 
  res:Response
){
  let conn;
  let cr: CustomResponse = { status: "ERROR", message: "", payload: undefined };

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_STR,
    });

    const cmdInsertAero = ``;

    const dados = [AeroportoSaida, AeroportoChegada];
    let resInsert = await conn.execute(cmdInsertAero, dados);

    await conn.commit();

    const rowsInserted = resInsert.rowsAffected;
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS";
      cr.message = "Aeroportos inseridos.";
    }
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroTrecho");
  }
}