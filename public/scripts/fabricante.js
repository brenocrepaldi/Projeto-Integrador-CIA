import express from "express";
import { conn } from "./database";

const app = express();

app.post("/cadastro/fabricante", (req, res) => {
  //salvar dados na tabela fabricante
  const fabricante = req.body.fabricante; //pegando os dados do input fabricante no body

  const sql = `insert into fabricante (fabricante) values ('${fabricante}');`;
  executaSql(sql);
});

app.get("/visualizar/fabricante", (req, res) => {
  //resgatar dados da tabela fabricante
  const sql = `select * from fabricante`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricantes = data;
    res.render("visualizarFabricante", { fabricantes }); //passando a pagina e os dados
  });
});
