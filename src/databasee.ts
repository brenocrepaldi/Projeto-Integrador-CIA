import mysql from "mysql2";
import { app } from "./app";
import * as dotenv from "dotenv";

dotenv.config();
export const conn = mysql.createConnection({
  //configurando a coenxão com o banco de dados
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
export function abreConexao() {
  //função para abrir conexão com o banco de dados
  conn.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log("Conectou no banco de dados.....");
    app.listen(3000);
  });
}
export function executaSql(sql: string) {
  //função para executar query
  return conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
}
