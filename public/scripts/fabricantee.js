"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroFabricante = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function cadastroFabricante(fabricante, req, res) {
    let conn;
    let cr = { status: "ERROR", message: "", payload: undefined };
    try {
        conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        const cmdInsertAero = `INSERT INTO FABRICANTE 
   (ID_FABRICANTE, NOME_FABRICANTE)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`;
        const dados = [fabricante];
        let resInsert = await conn.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        await conn.commit();
        // obter a informação de quantas linhas foram inseridas.
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Fabricante inserida.";
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
        res.render("cadastroFabricante");
    }
}
exports.cadastroFabricante = cadastroFabricante;
