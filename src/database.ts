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

export async function inserirSql(
  sql: string,
  dados: Array<any>,
  tabela: string
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
    cr.message = `Dado inserido para ${tabela}.`;
  } else if (rowsInserted === undefined) {
    cr.status = "SUCCESS";
    cr.message = `Nenhum dado inserido para ${tabela}.`;
  }
}

export async function selecionarSql(
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
  }
}

export async function excluirSql(sql: string) {
  try {
    let conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_STR,
    });

    const result = await conn.execute(sql);
    await conn.commit();

    console.log("Exclusão SQL executada com sucesso");
    return result.rowsAffected; // Retorna a quantidade de linhas afetadas
  } catch (e) {
    console.error("Erro na exclusão SQL:", e);
    throw e; // Lança o erro para ser tratado na rota Express
  }
}
//   try {
//     let conn = await oracledb.getConnection({
//       user: process.env.ORACLE_USER,
//       password: process.env.ORACLE_PASSWORD,
//       connectionString: process.env.ORACLE_STR,
//     });
//     await conn.execute(sql);
//     await conn.commit();
//     cr.status = "SUCCESS";
//     cr.message = `Dados selecionados com sucesso para`;

//     return console.log("Executou");
//   } catch (e) {
//     cr.status = "ERRO";
//     cr.message = `Erro na consulta SQL para: ${e}`;
//   }
// }
