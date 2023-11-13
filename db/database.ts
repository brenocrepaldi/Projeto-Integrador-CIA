import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import * as dotenv from "dotenv";

dotenv.config();
//varável de conexão
export let conn = oracledb.getConnection({
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_STR,
});

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
//função para executar queries
export async function executarSql(
  sql: string,
  dados: Array<any>,
  tabela: string
) {
  try {
    let resSql = await (await conn).execute(sql, dados);

    await (await conn).commit();

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
//função para retornar dados
export async function retornarDados(
  sql: string,
  dados: Array<any>,
  tabela: string
) {
  try {
    let resSql = await (await conn).execute(sql, dados);

    cr.status = "SUCCESS";
    cr.message = `Dados selecionados com sucesso para ${tabela}`;

    return resSql.rows;
  } catch (e) {
    cr.status = "ERRO";
    cr.message = `Erro na consulta SQL para ${tabela}: ${e}`;
    console.log(cr);
  }
}
//função para excluir dados
export async function excluirDados(sql: string) {
  try {
    const result = await (await conn).execute(sql);
    await (await conn).commit();

    console.log("Exclusão SQL executada com sucesso");
    return result.rowsAffected;
  } catch (e) {
    console.error("Erro na exclusão SQL:", e);
    throw e;
  } finally {
    console.log(cr);
  }
}
