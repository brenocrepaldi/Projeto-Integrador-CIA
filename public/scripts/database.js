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
exports.excluirDados = exports.retornarDados = exports.executarSql = exports.cr = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.cr = {
    status: "ERROR",
    message: "",
    payload: undefined,
};
async function executarSql(sql, dados, tabela) {
    try {
        let conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        let resSql = await conn.execute(sql, dados);
        await conn.commit();
        const rowsInserted = resSql.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            exports.cr.status = "SUCCESS";
            exports.cr.message = `Dado inserido para ${tabela}.`;
            return true;
        }
        else if (rowsInserted === undefined) {
            exports.cr.status = "SUCCESS";
            exports.cr.message = `Nenhum dado inserido para ${tabela}.`;
        }
    }
    catch (e) {
        exports.cr.status = "ERRO";
        exports.cr.message = `Erro na execução SQL para ${tabela}: ${e}`;
        return false;
    }
    finally {
        console.log(exports.cr);
    }
}
exports.executarSql = executarSql;
async function retornarDados(sql, dados, tabela) {
    try {
        let conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        let resSql = await conn.execute(sql, dados);
        exports.cr.status = "SUCCESS";
        exports.cr.message = `Dados selecionados com sucesso para ${tabela}`;
        return resSql.rows;
    }
    catch (e) {
        exports.cr.status = "ERRO";
        exports.cr.message = `Erro na consulta SQL para ${tabela}: ${e}`;
        console.log(exports.cr);
    }
}
exports.retornarDados = retornarDados;
async function excluirDados(sql) {
    try {
        let conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_STR,
        });
        const result = await conn.execute(sql);
        await conn.commit();
        console.log("Exclusão SQL executada com sucesso");
        return result.rowsAffected;
    }
    catch (e) {
        console.error("Erro na exclusão SQL:", e);
        throw e;
    }
    finally {
        console.log(exports.cr);
    }
}
exports.excluirDados = excluirDados;
