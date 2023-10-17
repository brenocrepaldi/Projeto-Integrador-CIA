import express from "express";
import exphbs, { create } from "express-handlebars";
import * as dotenv from "dotenv";
import { cadastroAeronave, visualizarAeronaves } from "./aeronave";
import { cadastroAeroporto, visualizarAeroportos } from "./aeroporto";
import { cadastroFabricante, visualizarFabricante } from "./fabricante";
import { cadastroTrecho } from "./trecho";
import { cadastroVoo, visualizarVoos } from "./voo";
import { excluirSql, executaSql, selecionarSql } from "./database";

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

app.get("/cadastro/aeronave", async (req, res) => {
  const selectSql = `SELECT * FROM FABRICANTE`;

  const result = (await selecionarSql(
    selectSql,
    [],
    "Fabricantes"
  )) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      nomeFabricante: item[1],
      idFabricante: item[0],
    }));
  }
  res.render("cadastroAeronave", { fabricante: dados });
});

app.post("/cadastro/aeronave", (req, res) => {
  const modelo = req.body.modelo;
  const numAssento = req.body.numAssento;
  const anoFabricacao = req.body.anoFabricacao;
  const registro = req.body.registro;
  const status = req.body.status;
  const idfabricante = req.body.idFabricante;

  cadastroAeronave(
    modelo,
    numAssento,
    anoFabricacao,
    registro,
    status,
    idfabricante,
    req,
    res
  );
});

app.get("/visualizar/aeronave", (req, res) => {
  visualizarAeronaves(req, res);
});

app.get("/editar/aeronave/:id", async (req, res) => {
  const idAeronave = req.params.id;

  const sql = `SELECT * FROM AERONAVE WHERE ID_AERONAVE = '${idAeronave}'`;

  const result = (await selecionarSql(sql, [], "Aeronaves")) as string[][];

  console.log("entrou");

  let dados;
  if (result) {
    dados = result.map((item) => ({
      idAeronave: item[0],
      modelo: item[1],
      numassento: item[2],
      registro: item[3],
      status: item[4],
      anoFabricacao: item[5],
      fabricante: item[6],
    }));
  }

  res.render("editFabricante", { aeronaves: dados });
});

app.post("/editar/aeronave/:id", async (req, res) => {
  const idAeronave = req.params.id;
  const modelo = req.body.modelo;
  const numAssento = req.body.numAssento;
  const anoFabricacao = req.body.anoFabricacao;
  const registro = req.body.registro;
  const status = req.body.status;
  const idfabricante = req.body.idFabricante;

  const sql = `
    UPDATE AERONAVE
    SET MODELO = '${modelo}',
        NUM_ASSENTO = ${numAssento},
        REGISTRO = '${registro}',
        STATUS = '${status}',
        ANO_FABRICACAO = ${anoFabricacao},
        ID_FABRICANTE = ${idfabricante}
    WHERE ID_AERONAVE = ${idAeronave};
  `;

  executaSql(sql, [], "Aeronvaves");
});

app.post("/excluir/aeronave/:id", async (req, res) => {
  const idAeronave = req.params.id;
  const sql = `DELETE FROM AERONAVE WHERE ID_AERONAVE='${idAeronave}'`;

  try {
    await excluirSql(sql);
  } catch (error) {
    res
      .status(500)
      .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
  } finally {
    res.redirect("/visualizar/aeronave");
  }
});

app.get("/cadastro/aeroporto", async (req, res) => {
  const selectSql = `SELECT * FROM cidade`;

  const result = (await selecionarSql(selectSql, [], "Cidades")) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      idCidade: item[0],
      cidade: item[1],
    }));
  }
  res.render("cadastroAeroporto", { cidades: dados });
});

app.post("/cadastro/aeroporto", (req, res) => {
  const aeroporto = req.body.aeroporto;
  const cidade = req.body.idCidade;
  cadastroAeroporto(aeroporto, cidade, req, res);
});

app.get("/visualizar/aeroporto", (req, res) => {
  visualizarAeroportos(req, res);
});

app.post("/excluir/aeroporto/:id", async (req, res) => {
  const idAeroporto = req.params.id;
  const sql = `DELETE FROM AEROPORTO WHERE ID_AEROPORTO='${idAeroporto}'`;

  try {
    await excluirSql(sql);
  } catch (error) {
    res
      .status(500)
      .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    return;
  } finally {
    res.redirect("/visualizar/aeroporto");
  }
});

app.get("/fabricante", (req, res) => {
  res.render("acaoFabricante");
});

app.get("/cadastro/fabricante", (req, res) => {
  res.render("cadastroFabricante"); // renderiza a página do fabricante
});

app.post("/cadastro/fabricante", (req, res) => {
  const fabricante = req.body.fabricante;
  cadastroFabricante(fabricante, req, res);
});

app.get("/visualizar/fabricante", (req, res) => {
  visualizarFabricante(req, res);
});

app.get("/editar/fabricante/:id", async (req, res) => {
  const idFabricante = req.params.id;

  const sql = `SELECT * FROM FABRICANTE WHERE ID_FABRICANTE = '${idFabricante}'`;

  const result = (await selecionarSql(sql, [], "Fabricantes")) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      idFabricante: item[0],
      nomeFabricante: item[1],
    }));
  }

  res.render("editFabricante", { fabricante: dados });
});

app.post("/editar/fabricante/:id", async (req, res) => {
  console.log("entrou");
  const idFabricante = req.params.id;
  const fabricante = req.body.fabricante;
  console.log(idFabricante, fabricante);
  const sql = `
    UPDATE FABRICANTE
    SET NOME_FABRICANTE = '${fabricante}'
    WHERE ID_FABRICANTE = '${idFabricante}';
  `;
  console.log(sql);

  inserirSql(sql, [], "Fabricantes");
});

app.post("/excluir/fabricante/:id", async (req, res) => {
  const idFabricante = req.params.id;
  const sql = `DELETE FROM FABRICANTE WHERE ID_FABRICANTE='${idFabricante}'`;

  try {
    await excluirSql(sql);
  } catch (error) {
    res
      .status(500)
      .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
  } finally {
    res.redirect("/visualizar/fabricante");
  }
});

app.get("/cadastro/trecho", async (req, res) => {
  const selectSql = `SELECT * FROM aeroporto`;

  const result = (await selecionarSql(
    selectSql,
    [],
    "Aeroportos"
  )) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      idAeroporto: item[0],
      aeroporto: item[1],
      cidade: item[2],
    }));
  }
  res.render("cadastroTrecho", { aeroportos: dados });
});

app.post("/cadastro/trecho", (req, res) => {
  const idAeroportoSaida = req.body.idAeroportoSaida;
  const idAeroportoChegada = req.body.idAeroportoChegada;
  cadastroTrecho(idAeroportoSaida, idAeroportoChegada, req, res);
});

app.get("/cadastro/voo", async (req, res) => {
  // ARRUMAR

  const selectSql = `SELECT T.ID_TRECHO, A.NOME_AEROPORTO FROM TRECHO T, AEROPORTO A WHERE T.ID_AEROPORTO_SAIDA = A.ID_AEROPORTO`;

  // const selectSql = `
  //   SELECT T.ID_TRECHO, A_SAIDA.NOME_AEROPORTO AS NOME_AEROPORTO_SAIDA, A_CHEGADA.NOME_AEROPORTO AS NOME_AEROPORTO_CHEGADA FROM TRECHO T JOIN AEROPORTO A_SAIDA ON T.ID_AEROPORTO_SAIDA = A_SAIDA.ID_AEROPORTO JOIN AEROPORTO A_CHEGADA ON T.ID_AEROPORTO_CHEGADA = A_CHEGADA.ID_AEROPORTO;
  // `;

  const result = (await selecionarSql(selectSql, [], "Trechos")) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      idTrecho: item[0],
      aeroportoSaida: item[1],
      //aeroportoChegada: item[2],
    }));
  }

  res.render("cadastroVoo", { trechos: dados });
});

app.post("/cadastro/voo", (req, res) => {
  const valor = req.body.valor;
  const horaSaida = req.body.horaSaida;
  const horaChegada = req.body.horaChegada;
  const dataSaida = req.body.dataSaida;
  const dataChegada = req.body.dataChagada;
  const idTrecho = req.body.idTrecho;
  cadastroVoo(
    valor,
    horaSaida,
    horaChegada,
    idTrecho,
    dataSaida,
    dataChegada,
    req,
    res
  );
});

app.get("/visualizar/voo", (req, res) => {
  visualizarVoos(req, res);
});

app.use(express.static("public")); //configurando pra receber o css, definindo a pasta public como static

app.listen(3333, () => {
  console.log("App funcionando");
});
