import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import * as dotenv from "dotenv";
import e from "express";

dotenv.config();

export type CustomResponse = {
  status: string;
  message: string;
  payload: any;
};

export let cr: CustomResponse = {
  status: "ERROR",
  message: "",
  payload: undefined,
};

export async function executarSql(
  sql: string,
  dados: Array<any>,
  tabela: string
) {
  try {
    let conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_STR,
    });
    console.log(sql, dados);
    let resSql = await conn.execute(sql, dados);

    await conn.commit();

    console.log(resSql.rowsAffected);
    console.log("--------------------------------------");
    console.log(resSql.rows);

    const rowsInserted = resSql.rowsAffected;
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS";
      cr.message = `Dado inserido para ${tabela}.`;
      return true;
    } else if (rowsInserted === undefined) {
      cr.status = "SUCCESS";
      cr.message = `Nenhum dado inserido para ${tabela}.`;
    }
  } catch (e) {
    cr.status = "ERRO";
    cr.message = `Erro na execução SQL para ${tabela}: ${e}`;
    return false;
  } finally {
    console.log(cr);
  }
}

export async function retornarDados(
  sql: string,
  dados: Array<any>,
  tabela: string
) {
  try {
    let conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_STR,
    });

    let resSql = await conn.execute(sql, dados);

    cr.status = "SUCCESS";
    cr.message = `Dados selecionados com sucesso para ${tabela}`;

    return resSql.rows;
  } catch (e) {
    cr.status = "ERRO";
    cr.message = `Erro na consulta SQL para ${tabela}: ${e}`;
    console.log(cr);
  }
}

export async function excluirDados(sql: string) {
  try {
    let conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_STR,
    });

    console.log('entrou');

    const result = await conn.execute(sql);
    await conn.commit();

    console.log("Exclusão SQL executada com sucesso");
    return result.rowsAffected;
  } catch (e) {
    console.error("Erro na exclusão SQL:", e);
    throw e;
  } finally {
    console.log(cr);
  }
}
