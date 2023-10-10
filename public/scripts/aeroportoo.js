"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroAeroporto = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function cadastroAeroporto(aeroporto, cidade, req, res) {
    let conn;
    let cr = { status: "ERROR", message: "", payload: undefined };
    try {
        conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        const cmdInsertAero = `INSERT INTO AEROPORTOS 
   (ID_AEROPORTO, NOME_AEROPORTO, CIDADE) 
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1, :2)`; // alterar as tabelas no banco
        const dados = [aeroporto, cidade];
        let resInsert = await conn.execute(cmdInsertAero, dados);
        await conn.commit();
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeroporto inserido.";
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
        res.render("cadastroAeroporto");
    }
}
exports.cadastroAeroporto = cadastroAeroporto;
