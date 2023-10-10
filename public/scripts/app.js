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
const cadastroFabricante_1 = require("./cadastroFabricante");
// import { cadastroFabricante } from "./cadastroFabricante";
// import { cadastroAeronave } from "./aeronavee";
// import { cadastroAeroporto } from "./aeroportoo";
// abreConexao();//codigo antigo mysql
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
exports.app.get("/cadastro/fabricante", (req, res) => {
    res.render("cadastroFabricante"); // renderiza a página do fabricante
});
exports.app.post("/cadastro/fabricante", (req, res) => {
    const fabricante = req.body.fabricante;
    (0, cadastroFabricante_1.cadastroFabricante)(fabricante, req, res);
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
exports.app.get("/cadastro/aeroporto", (req, res) => {
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
exports.app.use(express_1.default.static("public")); //configurando pra receber o css, definindo a pasta public como static
exports.app.listen(3333, () => {
    console.log("App funcionando");
});
