"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const dotenv = __importStar(require("dotenv"));
const aeronave_1 = require("./aeronave");
const aeroporto_1 = require("./aeroporto");
const fabricante_1 = require("./fabricante");
const trecho_1 = require("./trecho");
const voo_1 = require("./voo");
const database_1 = require("./database");
exports.app = (0, express_1.default)();
dotenv.config();
exports.app.use(
//configurando o express para pegar o body
express_1.default.urlencoded({
    extended: true,
}));
exports.app.use(express_1.default.json()); //pegar o body em json
const hbs = (0, express_handlebars_1.create)({
    //configurando diretório partials
    partialsDir: ["views/partials"],
});
exports.app.engine("handlebars", hbs.engine);
exports.app.set("view engine", "handlebars");
exports.app.set("views", "./views");
exports.app.get("/home", (req, res) => {
    res.render("home");
});
exports.app.get("/cadastro/aeronave", async (req, res) => {
    const selectSql = `SELECT * FROM FABRICANTE`;
    const result = (await (0, database_1.retornarDados)(selectSql, [], "Fabricantes"));
    let dados;
    if (result) {
        dados = result.map((item) => ({
            idFabricante: item[0],
            nomeFabricante: item[1],
        }));
    }
    res.render("cadastroAeronave", { fabricante: dados });
});
exports.app.post("/cadastro/aeronave", (req, res) => {
    const modelo = req.body.modelo;
    const numAssento = req.body.numAssento;
    const anoFabricacao = req.body.anoFabricacao;
    const registro = req.body.registro;
    const status = req.body.status;
    const idfabricante = req.body.idFabricante;
    (0, aeronave_1.cadastroAeronave)(modelo, numAssento, anoFabricacao, registro, status, idfabricante, req, res);
});
exports.app.get("/visualizar/aeronave", (req, res) => {
    (0, aeronave_1.visualizarAeronaves)(req, res);
});
exports.app.get("/editar/aeronave/:id", async (req, res) => {
    const idAeronave = req.params.id;
    try {
        const aeronaveSql = `SELECT ID_AERONAVE, MODELO, NUM_ASSENTO, REGISTRO, STATUS, ANO_FABRICACAO FROM AERONAVE WHERE ID_AERONAVE = ${idAeronave}`;
        const fabricanteSql = `SELECT * FROM FABRICANTE`;
        const resultAeronave = (await (0, database_1.retornarDados)(aeronaveSql, [], "Aeronaves"));
        const resultFabricantes = (await (0, database_1.retornarDados)(fabricanteSql, [], "Fabricantes"));
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
    }
    catch (e) {
        console.log(e);
    }
});
exports.app.post("/editar/aeronave/:id", async (req, res) => {
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
  WHERE 
    ID_AERONAVE = ${idAeronave}
  `;
    console.log(sql);
    (0, database_1.executarSql)(sql, [], "Aeronvaves");
    res.redirect("/visualizar/aeronave");
});
exports.app.post("/excluir/aeronave/:id", async (req, res) => {
    const idAeronave = req.params.id;
    const sql = `DELETE FROM AERONAVE WHERE ID_AERONAVE = '${idAeronave}'`;
    try {
        await (0, database_1.excluirDados)(sql);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    }
    finally {
        res.redirect("/visualizar/aeronave");
    }
});
exports.app.get("/cadastro/aeroporto", async (req, res) => {
    const selectSql = `SELECT * FROM cidade`;
    const result = (await (0, database_1.retornarDados)(selectSql, [], "Cidades"));
    let dados;
    if (result) {
        dados = result.map((item) => ({
            idCidade: item[0],
            cidade: item[1],
        }));
    }
    res.render("cadastroAeroporto", { cidades: dados });
});
exports.app.post("/cadastro/aeroporto", (req, res) => {
    const aeroporto = req.body.aeroporto;
    const cidade = req.body.idCidade;
    (0, aeroporto_1.cadastroAeroporto)(aeroporto, cidade, req, res);
});
exports.app.get("/visualizar/aeroporto", (req, res) => {
    (0, aeroporto_1.visualizarAeroportos)(req, res);
});
exports.app.get("/editar/aeroporto/:id", async (req, res) => {
    const idAeroporto = req.params.id;
    try {
        const aeroportoSql = `SELECT * FROM AEROPORTO WHERE ID_AEROPORTO = ${idAeroporto}`;
        const cidadeSql = `SELECT * FROM CIDADE`;
        const resultAeroporto = (await (0, database_1.retornarDados)(aeroportoSql, [], "Aeroportos"));
        const resultCidades = (await (0, database_1.retornarDados)(cidadeSql, [], "Cidades"));
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
            aeroportos: dadosAeroporto,
            cidades: dadosCidades,
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.app.post("/editar/aeroporto/:id", (req, res) => {
    const idAeroporto = req.params.id;
    const aeroporto = req.body.aeroporto;
    const idCidade = req.body.idCidade;
    const sql = `
  UPDATE AEROPORTO
    SET NOME_AEROPORTO = '${aeroporto}',
        ID_CIDADE = ${idCidade}
  WHERE 
      ID_AEROPORTO = ${idAeroporto}
  `;
    (0, database_1.executarSql)(sql, [], "Aeroportos");
    res.redirect("/visualizar/aeroporto");
});
exports.app.post("/excluir/aeroporto/:id", async (req, res) => {
    const idAeroporto = req.params.id;
    const sql = `DELETE FROM AEROPORTO WHERE ID_AEROPORTO='${idAeroporto}'`;
    try {
        await (0, database_1.excluirDados)(sql);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    }
    finally {
        res.redirect("/visualizar/aeroporto");
    }
});
exports.app.get("/fabricante", (req, res) => {
    res.render("acaoFabricante");
});
exports.app.get("/cadastro/fabricante", (req, res) => {
    res.render("cadastroFabricante"); // renderiza a página do fabricante
});
exports.app.post("/cadastro/fabricante", (req, res) => {
    const fabricante = req.body.fabricante;
    (0, fabricante_1.cadastroFabricante)(fabricante, req, res);
});
exports.app.get("/visualizar/fabricante", (req, res) => {
    (0, fabricante_1.visualizarFabricante)(req, res);
});
exports.app.get("/editar/fabricante/:id", async (req, res) => {
    const idFabricante = req.params.id;
    const sql = `SELECT * FROM FABRICANTE WHERE ID_FABRICANTE = '${idFabricante}'`;
    const result = (await (0, database_1.retornarDados)(sql, [], "Fabricantes"));
    let dados;
    if (result) {
        dados = result.map((item) => ({
            idFabricante: item[0],
            nomeFabricante: item[1],
        }));
    }
    res.render("editFabricante", { fabricante: dados });
});
exports.app.post("/editar/fabricante/:id", async (req, res) => {
    const fabricante = req.body.fabricante;
    const idFabricante = req.params.id;
    console.log(typeof idFabricante, typeof fabricante);
    const sql = `
  UPDATE FABRICANTE
    SET NOME_FABRICANTE = '${fabricante}'
  WHERE 
      ID_FABRICANTE = ${idFabricante}
  `;
    console.log(sql);
    (0, database_1.executarSql)(sql, [], "Fabricantes");
    res.redirect("/visualizar/fabricante");
});
exports.app.post("/excluir/fabricante/:id", async (req, res) => {
    const idFabricante = req.params.id;
    const sql = `DELETE FROM FABRICANTE WHERE ID_FABRICANTE='${idFabricante}'`;
    try {
        await (0, database_1.excluirDados)(sql);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: "ERROR", message: `Erro na exclusão: Erro` });
    }
    finally {
        res.redirect("/visualizar/fabricante");
    }
});
exports.app.get("/cadastro/trecho", async (req, res) => {
    const selectSql = `SELECT * FROM aeroporto`;
    const result = (await (0, database_1.retornarDados)(selectSql, [], "Aeroportos"));
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
exports.app.post("/cadastro/trecho", (req, res) => {
    const idAeroportoSaida = req.body.idAeroportoSaida;
    const idAeroportoChegada = req.body.idAeroportoChegada;
    (0, trecho_1.cadastroTrecho)(idAeroportoSaida, idAeroportoChegada, req, res);
});
exports.app.get("/cadastro/voo", async (req, res) => {
    const trechoSql = `
    SELECT T.ID_TRECHO, A_SAIDA.NOME_AEROPORTO AS NOME_AEROPORTO_SAIDA, A_CHEGADA.NOME_AEROPORTO AS NOME_AEROPORTO_CHEGADA FROM TRECHO T JOIN AEROPORTO A_SAIDA ON T.ID_AEROPORTO_SAIDA = A_SAIDA.ID_AEROPORTO JOIN AEROPORTO A_CHEGADA ON T.ID_AEROPORTO_CHEGADA = A_CHEGADA.ID_AEROPORTO
  `;
    const aeronaveSql = `SELECT ID_AERONAVE, MODELO FROM AERONAVE`;
    const resultTrechos = (await (0, database_1.retornarDados)(trechoSql, [], "Trechos"));
    const resultAeronave = (await (0, database_1.retornarDados)(aeronaveSql, [], "Aeronaves"));
    let dadosTrechos;
    let dadosAeronave;
    if (resultTrechos) {
        dadosTrechos = resultTrechos.map((item) => ({
            idTrecho: item[0],
            aeroportoSaida: item[1],
            aeroportoChegada: item[2],
        }));
    }
    if (resultAeronave) {
        dadosAeronave = resultAeronave.map((item) => ({
            idAeronave: item[0],
            modelo: item[1],
        }));
    }
    res.render("cadastroVoo", { trechos: dadosTrechos, aeronaves: dadosAeronave });
});
exports.app.post("/cadastro/voo", (req, res) => {
    const valor = req.body.valor;
    const horaSaida = req.body.horaSaida;
    const horaChegada = req.body.horaChegada;
    const dataSaida = req.body.dataSaida;
    const dataChegada = req.body.dataChegada;
    const idTrecho = req.body.idTrecho;
    const idAeronave = req.body.idAeronave;
    const timestampSaida = `${dataSaida} ${horaSaida}:00`;
    const timestampChegada = `${dataSaida} ${horaChegada}:00`;
    console.log(timestampSaida, timestampChegada);
    (0, voo_1.cadastroVoo)(valor, timestampSaida, timestampChegada, idTrecho, idAeronave, req, res);
});
exports.app.get("/visualizar/voo", (req, res) => {
    (0, voo_1.visualizarVoos)(req, res);
});
exports.app.use(express_1.default.static("public")); //configurando pra receber o css, definindo a pasta public como static
exports.app.listen(3333, () => {
    console.log("App funcionando");
});
