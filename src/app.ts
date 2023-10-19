import express from "express";
import exphbs, { create } from "express-handlebars";
import * as dotenv from "dotenv";
import {
  cadastroAeronave,
  visualizarAeronaves,
  editarAeronave,
} from "./aeronave";
import { cadastroAeroporto, visualizarAeroportos } from "./aeroporto";
import { cadastroFabricante, visualizarFabricante } from "./fabricante";
import { cadastroTrecho } from "./trecho";
import { cadastroVoo, visualizarVoos } from "./voo";
import { excluirDados, retornarDados, executarSql } from "./database";

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

  const result = (await retornarDados(
    selectSql,
    [],
    "Fabricantes"
  )) as string[][];

  let dados;

  if (result) {
    dados = result.map((item) => ({
      idFabricante: item[0],
      nomeFabricante: item[1],
    }));
  }

  console.log(dados);
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

  try {
    const aeronaveSql = `SELECT ID_AERONAVE, MODELO, NUM_ASSENTO, REGISTRO, STATUS, ANO_FABRICACAO FROM AERONAVE WHERE ID_AERONAVE = '${idAeronave}'`;
    const fabricanteSql = `SELECT * FROM FABRICANTE`;

    const resultAeronave = (await retornarDados(
      aeronaveSql,
      [],
      "Aeronaves"
    )) as string[][];
    const resultFabricantes = (await retornarDados(
      fabricanteSql,
      [],
      "Fabricantes"
    )) as string[][];

    let dadosAeronave;
    let dadosFabricantes;

    if (resultAeronave) {
      dadosAeronave = resultAeronave.map((item) => ({
        idAeronave: item[0],
        modelo: item[1],
        numassento: item[2],
        registro: item[3],
        status: item[4],
        anoFabricacao: item[5],
      }));
    }
    if (resultFabricantes) {
      dadosFabricantes = resultFabricantes.map((item) => ({
        idFabricante: item[0],
        nomeFabricante: item[1],
      }));
    }

    res.render("editAeronave", {
      aeronaves: dadosAeronave,
      fabricantes: dadosFabricantes,
    });
  } catch (e) {
    console.log(e);
  }
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
        DECLARE
      IN_ID_AERONAVE BINARY_INTEGER;
      IN_MODELO CHAR(200);
      IN_NUM_ASSENTO BINARY_INTEGER;
      IN_REGISTRO CHAR(200);
      IN_STATUS CHAR(200);
      IN_ANO_FABRICACAO BINARY_INTEGER;
      IN_ID_FABRICANTE BINARY_INTEGER;
      v_Return BINARY_INTEGER;
    BEGIN
      IN_ID_AERONAVE := ${idAeronave};
      IN_MODELO := '${modelo}';
      IN_NUM_ASSENTO := ${numAssento};
      IN_REGISTRO := '${registro}';
      IN_STATUS := '${status}';
      IN_ANO_FABRICACAO := ${anoFabricacao};
      IN_ID_FABRICANTE := ${idfabricante};

      v_Return := ALTERAR_DADOS_AERONAVE(
        IN_ID_AERONAVE => IN_ID_AERONAVE,
        IN_MODELO => IN_MODELO,
        IN_NUM_ASSENTO => IN_NUM_ASSENTO,
        IN_REGISTRO => IN_REGISTRO,
        IN_STATUS => IN_STATUS,
        IN_ANO_FABRICACAO => IN_ANO_FABRICACAO,
        IN_ID_FABRICANTE => IN_ID_FABRICANTE
      );
    END;
  `;

  executarSql(sql, [], "Aeronvaves");

  res.redirect("/visualizar/aeronave");
});

app.post("/excluir/aeronave/:id", async (req, res) => {
  const idAeronave = req.params.id;
  const sql = `DELETE FROM AERONAVE WHERE ID_AERONAVE = '${idAeronave}'`;

  try {
    await excluirDados(sql);
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

  const result = (await retornarDados(selectSql, [], "Cidades")) as string[][];

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

app.get("/editar/aeroporto/:id", async (req, res) => {
  const idAeroporto = req.body.idAeroporto;

  try {
    const aeroportoSql = `SELECT * FROM AEROPORTO WHERE ID_AEROPORTO = '${idAeroporto};'`;
    const cidadeSql = `SELECT * FROM CIDADE`;

    const resultAeroporto = (await retornarDados(
      aeroportoSql,
      [],
      "Aeroportos"
    )) as string[][];
    const resultCidades = (await retornarDados(
      cidadeSql,
      [],
      "Cidades"
    )) as string[][];

    let dadosAeroporto;
    let dadosCidades;

    if (resultAeroporto) {
      dadosAeroporto = resultAeroporto.map((item) => ({
        idAeroporto: item[0],
        aeroporto: item[1],
        idCidade: item[2],
      }));
    }
    if (resultCidades) {
      dadosCidades = resultCidades.map((item) => ({
        idCidade: item[0],
        cidade: item[1],
      }));
    }

    res.render("editAeroporto", {
      aeroporto: dadosAeroporto,
      cidades: dadosCidades,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/excluir/aeroporto/:id", async (req, res) => {
  const idAeroporto = req.params.id;
  const sql = `DELETE FROM AEROPORTO WHERE ID_AEROPORTO='${idAeroporto}'`;

  try {
    await excluirDados(sql);
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

  const result = (await retornarDados(sql, [], "Fabricantes")) as string[][];

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
  const fabricante = req.body.fabricante;
  const idFabricante = req.params.id;
  console.log(typeof idFabricante, typeof fabricante);

  const sql = `
        DECLARE
        IN_ID_FABRICANTE BINARY_INTEGER;
        IN_NOME_FABRICANTE CHAR(200);
        v_Return BINARY_INTEGER;
      BEGIN
        IN_ID_FABRICANTE := ${idFabricante};
        IN_NOME_FABRICANTE := '${fabricante}';
        v_Return := ALTERAR_DADOS_FABRICANTE(
          IN_ID_FABRICANTE => IN_ID_FABRICANTE,
          IN_NOME_FABRICANTE => IN_NOME_FABRICANTE
      );
    END;
  `;

  console.log(sql);

  executarSql(sql, [], "Fabricantes");

  res.redirect("/visualizar/fabricante");
});

app.post("/excluir/fabricante/:id", async (req, res) => {
  const idFabricante = req.params.id;
  const sql = `DELETE FROM FABRICANTE WHERE ID_FABRICANTE='${idFabricante}'`;

  try {
    await excluirDados(sql);
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

  const result = (await retornarDados(
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

  const result = (await retornarDados(selectSql, [], "Trechos")) as string[][];

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
