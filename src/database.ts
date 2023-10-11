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

export async function executaSql(
  sql: string,
  dados: Array<any>,
  objeto: string
) {
  let conn = await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectionString: process.env.ORACLE_STR,
  });

  let resInsert = await conn.execute(sql, dados);

  await conn.commit();
  const rowsInserted = resInsert.rowsAffected;
  if (rowsInserted !== undefined && rowsInserted === 1) {
    cr.status = "SUCCESS";
    cr.message = `${objeto} inserido(a).`;
  }
}
