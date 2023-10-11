"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroTrecho = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function cadastroTrecho(AeroportoSaida, AeroportoChegada, req, res) {
    let conn;
    let cr = { status: "ERROR", message: "", payload: undefined };
    try {
        conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        const cmdInsertAero = ``;
        const dados = [AeroportoSaida, AeroportoChegada];
        let resInsert = await conn.execute(cmdInsertAero, dados);
        await conn.commit();
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeroportos inseridos.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        res.render("cadastroTrecho");
    }
}
exports.cadastroTrecho = cadastroTrecho;
