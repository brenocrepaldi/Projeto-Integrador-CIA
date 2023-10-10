import express from "express";
import exphbs, { create } from "express-handlebars";
import * as dotenv from "dotenv";

// import { executaSql } from "./databasee";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import { cadastroFabricante } from "./fabricantee";
import { cadastroAeronave } from "./aeronavee";
import { cadastroAeroporto } from "./aeroportoo";
import { cadastroVoo } from "./voo";
import { cadastroTrecho } from "./trecho";

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

app.get("/cadastro/aeronave", (req, res) => {
  res.render('cadastroAeronave');
});

app.post("/cadastro/aeronave", (req, res) => {
  const modelo = req.body.modelo;
  const numAssento = req.body.numAssento;
  const anoFabricacao = req.body.anoFabricacao;
  cadastroAeronave(modelo, numAssento, anoFabricacao, req, res);
});

app.get("/cadastro/fabricante", (req, res) => {
  res.render('cadastroFabricante'); // renderiza a página do fabricante
});
app.post("/cadastro/fabricante", (req, res) => {
  const fabricante = req.body.fabricante;
  cadastroFabricante(fabricante, req, res);
});

app.get("/cadastro/aeroporto", (req, res) => {
  res.render('cadastroAeroporto');
});

app.post("/cadastro/aeroporto", (req, res) => {
  const aeroporto = req.body.aeroporto;
  const cidade = req.body.cidade;
  cadastroAeroporto(aeroporto, cidade, req, res);
});

app.get("/cadastro/voo", (req, res) => {
  res.render('cadastroVoo');
});

app.post("/cadastro/voo", (req, res) => {
  const valor = req.body.valor;
  cadastroVoo(valor, req, res);
});

app.get("/cadastro/trecho", (req, res) => {
  res.render('cadastroTrecho');
})

app.post("/cadastro/trecho", (req, res) => {
  const AeroportoSaida = req.body.idAeroportoSaida;
  const AeroportoChegada = req.body.idAeroportoChegada;
  cadastroTrecho(AeroportoSaida, AeroportoChegada, req, res);
})

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

// app.get("/visualizar/fabricante", (req, res) => {
//   visualizarFabricante(req, res);
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

// app.get("/visualizar/aeroporto", (req, res) => {
//   visualizaAeroporto(req, res);
// });
// app.use("/visualizar/voo", (req, res) => {
//   const sql = "select * from voo";
//   executaSql(sql);
// });

app.use(express.static("public")); //configurando pra receber o css, definindo a pasta public como static

app.listen(3333, () => {
  console.log("App funcionando");
});
