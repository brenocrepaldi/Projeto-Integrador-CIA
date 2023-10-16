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
exports.app.get("/aeronave", (req, res) => {
    res.render("acaoAeronave");
});
exports.app.get("/cadastro/aeronave", async (req, res) => {
    const selectSql = `SELECT * FROM FABRICANTE`;
    const result = (await (0, database_1.selecionarSql)(selectSql, [], "Fabricantes"));
    let dados;
    if (result) {
        dados = result.map((item) => ({
            nomeFabricante: item[1],
            idFabricante: item[0],
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
    console.log(status, idfabricante);
});
exports.app.get("/visualizar/aeronave", (req, res) => {
    (0, aeronave_1.visualizarAeronaves)(req, res);
});
exports.app.get("/cadastro/aeroporto", async (req, res) => {
    const selectSql = `SELECT * FROM cidade`;
    const result = (await (0, database_1.selecionarSql)(selectSql, [], "Cidades"));
    let dados;
    if (result) {
        dados = result.map((item) => ({
            idCidade: item[0],
            cidade: item[1],
        }));
    }
    console.log(dados);
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
exports.app.get("/cadastro/trecho", (req, res) => {
    res.render("cadastroTrecho");
});
exports.app.post("/cadastro/trecho", (req, res) => {
    const AeroportoSaida = req.body.idAeroportoSaida;
    const AeroportoChegada = req.body.idAeroportoChegada;
    (0, trecho_1.cadastroTrecho)(AeroportoSaida, AeroportoChegada, req, res);
});
exports.app.get("/voo", (req, res) => {
    res.render("acaoVoo");
});
exports.app.get("/cadastro/voo", (req, res) => {
    res.render("cadastroVoo");
});
exports.app.post("/cadastro/voo", (req, res) => {
    const valor = req.body.valor;
    (0, voo_1.cadastroVoo)(valor, req, res);
});
exports.app.get("/visualizar/voo", (req, res) => {
    (0, voo_1.visualizarVoos)(req, res);
});
exports.app.use(express_1.default.static("public")); //configurando pra receber o css, definindo a pasta public como static
exports.app.listen(3333, () => {
    console.log("App funcionando");
});
