import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import * as dotenv from "dotenv";

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

export async function inserirSql(
  sql: string,
  dados: Array<any>,
  objeto: string
) {
  let conn = await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectionString: process.env.ORACLE_STR,
  });

  let resSql = await conn.execute(sql, dados);

  await conn.commit();

  const rowsInserted = resSql.rowsAffected;
  if (rowsInserted !== undefined && rowsInserted === 1) {
    cr.status = "SUCCESS";
    cr.message = `Dado inserido para ${objeto}.`;
  } else if (rowsInserted === undefined) {
    cr.status = "SUCCESS";
    cr.message = `Nenhum dado inserido para ${objeto}.`;
  }
}

export async function selecionarSql(
  sql: string,
  dados: Array<any>,
  objeto: string
) {
  try {
    let conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_STR,
    });

    let resSql = await conn.execute(sql, dados);

    await conn.commit();

    cr.status = 'SUCCESS';
    cr.message = `Dados selecionados com sucesso para ${objeto}`;

    return resSql.rows;
  } catch (e) {
    cr.status = 'ERRO';
    cr.message = `Erro na consulta SQL para ${objeto}: ${e}`;
  }
}
