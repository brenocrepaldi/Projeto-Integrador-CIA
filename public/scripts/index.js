import express from "express";
import exphbs from "express-handlebars"; //import {engine} from 'express-handlebars'
import mysql from "mysql2";
import { abreConexao, conn, executaSql } from "./database.js";

abreConexao();
const app = express();
app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); //pegar o body em json

const hbs = exphbs.create({
  //configurando diretório partials
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine); //Isso significa que estamos dizendo à nossa aplicação que, quando ela precisar renderizar páginas HTML, deve usar o mecanismo de template Handlebars.
app.set("view engine", "handlebars"); //está fornecendo o mecanismo de template Handlebars para o Express.js

app.use(express.static("public")); //configurando pra receber o css, definindo a pasta public como static

app.get("/cadastro/fabricante", (req, res) => {
  //criando rota para o cadastro do fabricante
  res.render("cadastroFabricante", { javascriptFile: "home.js" });
});
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
app.get("/cadastro/aeronave", (req, res) => {
  const sql = "select * from fabricante";
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricantes = data;
    res.render("cadastroAeronave", { fabricantes });
  });
});
app.post("/cadastro/aeronave", (req, res) => {
  const modelo = req.body.modelo;
  const anoFabricacao = req.body.anoFabricacao;
  const idFabricante = req.body.idFabricante;
  const sql = `insert into aeronave (modelo,anofabricacao,idfabricante) values('${modelo}','${anoFabricacao}','${idFabricante}');`;
  executaSql(sql);
});
app.get("/visualizar/aeronave", (req, res) => {
  const sql = `select * from aeronave`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeronaves = data;
    res.render("visualizarAeronave", { aeronaves });
  });
});

app.get("/cadastro/aeroporto", (req, res) => {
  res.render("cadastroAeroporto");
});

app.post("/cadastro/aeroporto", (req, res) => {
  const aeroporto = req.body.aeroporto;
  const cidade = req.body.cidade;
  const sql = `insert into aeroporto (aeroporto, cidade) values ('${aeroporto}', '${cidade}');`;

  executaSql(sql);
});

app.get("/visualizar/aeroporto", (req, res) => {
  const sql = "select * from aeroporto";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeroportos = data;
    res.render("visualizarAeroporto", { aeroportos });
  });
});
app.use("/visualizar/voo", (req, res) => {
  const sql = "select * from voo";
  executaSql(sql);
});
app.get("/cadastro/voo", (req, res) => {
  const sql = "select * from trecho";
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const trechos = data;
    res.render("cadastroVoo", { trechos });
  });
});
app.listen(3333, () => {
  console.log("App funcionando");
});
/*

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou no banco de dados.....");
  app.listen(3000);
});
*/
