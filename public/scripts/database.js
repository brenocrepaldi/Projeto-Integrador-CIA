import mysql from "mysql2";
import express from "express";

const server = express();

export const conn = mysql.createConnection({
  //configurando a coenxão com o banco de dados
  host: "localhost",
  user: "root",
  password: "",
  database: "companhiaaerea",
});
export function abreConexao() {
  //função para abrir conexão com o banco de dados

  conn.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log("Conectou no banco de dados.....");
    server.listen(3000);
  });
}
export function executaSql(sql) {
  //função para executar query
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
