import oracledb, { Connection, ConnectionAttributes, Result } from "oracledb";
import express, { Request, Response } from "express";
export type CustomResponse = {
  status: string;
  message: string;
  payload: any;
};

export async function cadastroFabricante(
  fabricante: string,
  req: Request,
  res: Response
) {
  let conn;
  let cr: CustomResponse = { status: "ERROR", message: "", payload: undefined };

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_STR,
    });

    const cmdInsertAero = `INSERT INTO FABRICANTE 
   (ID_FABRICANTE, NOME_FABRICANTE)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1)`;

    const dados = [fabricante];
    let resInsert = await conn.execute(cmdInsertAero, dados);

    // importante: efetuar o commit para gravar no Oracle.
    await conn.commit();

    // obter a informação de quantas linhas foram inseridas.
    // neste caso precisa ser exatamente 1
    const rowsInserted = resInsert.rowsAffected;
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS";
      cr.message = "Fabricante inserida.";
    }
  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.render("cadastroFabricante");
  }
}
