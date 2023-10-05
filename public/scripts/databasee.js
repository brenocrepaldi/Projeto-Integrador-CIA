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
exports.executaSql = exports.abreConexao = exports.conn = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const app_1 = require("./app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.conn = mysql2_1.default.createConnection({
    //configurando a coenxão com o banco de dados
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
function abreConexao() {
    //função para abrir conexão com o banco de dados
    exports.conn.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log("Conectou no banco de dados.....");
        app_1.app.listen(3000);
    });
}
exports.abreConexao = abreConexao;
function executaSql(sql) {
    //função para executar query
    return exports.conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.executaSql = executaSql;
