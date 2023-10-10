"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroVoo = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function cadastroVoo(valor, req, res) {
    let conn;
    let cr = { status: "ERROR", message: "", payload: undefined };
    try {
        conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        const cmdInsertAero = `INSERT INTO VOO 
   (ID_VOO, VALOR)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`; // alterar tabela no banco
        const dados = [valor];
        let resInsert = await conn.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        await conn.commit();
        // obter a informação de quantas linhas foram inseridas.
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Voo inserido.";
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
        res.render("cadastroVoo");
    }
}
exports.cadastroVoo = cadastroVoo;
