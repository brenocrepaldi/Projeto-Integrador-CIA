import express from "express";
import exphbs from "express-handlebars";

import { abreConexao, conn, executaSql } from "./databasee";
import { cadastroFabricante, visualizarFabricante } from "./fabricantee";
import { cadastroAeronave, visualizaAeronave } from "./aeronavee";
import { cadastroAeroporto, visualizaAeroporto } from "./aeroportoo";

abreConexao();
export const app = express();
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

// app.engine(
//   "handlebars",
//   exphbs.engine({
//     defaultLayout: "main", // Nome do layout padrão (main.handlebars)
//     layoutsDir: path.join(__dirname, "views", "layouts"), // Pasta de layouts
//     partialsDir: path.join(__dirname, "views", "partials"), // Pasta de partials
//   })
// );
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public")); //configurando pra receber o css, definindo a pasta public como static

app.get("/cadastro/fabricante", (req, res) => {
  res.render("cadastroFabricante");
});
app.post("/cadastro/fabricante", (req, res) => {
  cadastroFabricante(req, res);
  res.render("cadastroFabricante");
});
app.get("/visualizar/fabricante", (req, res) => {
  visualizarFabricante(req, res);
});
app.get("/editar/fabricante/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select fabricante from fabricante where idfabricante=${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricante = data;
    res.render("editFabricante", { fabricante });
  });
});

app.get("/cadastro/aeronave", (req, res) => {
  const sql = "select fabricante from fabricante ";
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricante = data;
    res.render("cadastroAeronave", { fabricante });
  });
});
app.post("/cadastro/aeronave", (req, res) => {
  cadastroAeronave(req, res);
});
app.get("/visualizar/aeronave", (req, res) => {
  visualizaAeronave(req, res);
});
app.get("/editar/aeronave/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select * from aeronave where idaeronave=${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeronave = data;
    res.render("cadastroAeronave", { aeronave });
  });
});
app.get("/cadastro/aeroporto", (req, res) => {
  res.render("cadastroAeroporto");
});

app.post("/cadastro/aeroporto", (req, res) => {
  cadastroAeroporto(req, res);
});

app.get("/visualizar/aeroporto", (req, res) => {
  visualizaAeroporto(req, res);
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
