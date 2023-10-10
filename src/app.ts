import express from "express";
import exphbs, { create } from "express-handlebars";
import * as dotenv from "dotenv";

// import { executaSql } from "./databasee";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import { cadastroFabricante } from "./cadastroFabricante";
// import { cadastroFabricante } from "./cadastroFabricante";
// import { cadastroAeronave } from "./aeronavee";
// import { cadastroAeroporto } from "./aeroportoo";

// abreConexao();//codigo antigo mysql
export const app = express();

dotenv.config();
app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //pegar o body em json
const hbs = create({
  //configurando diretório partials
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/cadastro/fabricante", (req, res) => {
  res.render("cadastroFabricante"); // renderiza a página do fabricante
});
app.post("/cadastro/fabricante", (req, res) => {
  const fabricante = req.body.fabricante;
  cadastroFabricante(fabricante, req, res);
});
// app.get("/visualizar/fabricante", (req, res) => {
//   visualizarFabricante(req, res);
// });
// app.get("/editar/fabricante/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `select fabricante from fabricante where idfabricante=${id}`;
//   connection.execute(sql, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     const fabricante = data;
//     res.render("editFabricante", { fabricante });
//   });
// });

// app.get("/cadastro/aeronave", (req, res) => {
//   const sql = "select fabricante from fabricante ";
//   connection.execute(sql, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     const fabricante = data;
//     res.render("cadastroAeronave", { fabricante });
//   });
// });
// app.post("/cadastro/aeronave", (req, res) => {
//   cadastroAeronave(req, res);
// });
// app.get("/visualizar/aeronave", (req, res) => {
//   visualizaAeronave(req, res);
// });
// app.get("/editar/aeronave/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `select * from aeronave where idaeronave=${id}`;
//   connection.execute(sql, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     const aeronave = data;
//     res.render("cadastroAeronave", { aeronave });
//   });
// });
app.get("/cadastro/aeroporto", (req, res) => {
  res.render("cadastroAeroporto");
});

// app.post("/cadastro/aeroporto", (req, res) => {
//   cadastroAeroporto(req, res);
// });

// app.get("/visualizar/aeroporto", (req, res) => {
//   visualizaAeroporto(req, res);
// });
// app.use("/visualizar/voo", (req, res) => {
//   const sql = "select * from voo";
//   executaSql(sql);
// });
// app.get("/cadastro/voo", (req, res) => {
//   const sql = "select * from trecho";
//   connection.execute(sql, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     const trechos = data;
//     res.render("cadastroVoo", { trechos });
//   });
// });
app.use(express.static("public")); //configurando pra receber o css, definindo a pasta public como static

app.listen(3333, () => {
  console.log("App funcionando");
});
