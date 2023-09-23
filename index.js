import express from "express";
import exphbs from "express-handlebars";
import mysql from "mysql2";

const app = express();

app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); //pegar o body em json

app.engine("handlebars", exphbs.engine()); //Isso significa que estamos dizendo à nossa aplicação que, quando ela precisar renderizar páginas HTML, deve usar o mecanismo de template Handlebars.
app.set("view engine", "handlebars"); //está fornecendo o mecanismo de template Handlebars para o Express.js

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/cadastro/fabricante", (req, res) => {
  //criando rota para o cadastro do fabricante
  res.render("cadastroFabricante");
});
app.post("/cadastro/fabricante", (req, res) => {
  //salvar dados na tabela fabricante
  const fabricante = req.body.fabricante; //pegando os dados do input fabricante no body

  const sql = `insert into fabricante (fabricante) values ('${fabricante}');`;
  conn.query(sql, (err) => {
    if (err) {
      //verifica se deu erro na execução da query
      console.log(err);
    }
  });
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
  res.render("cadastroAeronave");
});
app.post("/cadastro/aeronave", (req, res) => {
  const modelo = req.body.modelo;
  const anoFabricacao = req.body.anoFabricacao;
  const idFabricante = req.body.idFabricante;

  const sql = `insert into aeronave (modelo,anofabricacao,idfabricante) values('${modelo}','${anoFabricacao}',${idFabricante});`;
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
  });
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

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
  });
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

app.listen(3333, () => {
  console.log("App funcionando");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "companhiaaerea",
});
conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou no banco de dados.....");
  app.listen(3000);
});
