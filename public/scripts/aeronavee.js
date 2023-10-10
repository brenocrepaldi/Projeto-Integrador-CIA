"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroAeronave = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function cadastroAeronave(modelo, numAssento, anoFabricacao, req, res) {
    let conn;
    let cr = { status: "ERROR", message: "", payload: undefined };
    try {
        conn = await oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_STR,
        });
        const cmdInsertAero = `INSERT INTO AERONAVES 
   (ID_AERONAVE, MODELO, ANOFABRICACAO, NUM_ASSENTO)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1, :2, :3)`;
        const dados = [modelo, numAssento, anoFabricacao];
        let resInsert = await conn.execute(cmdInsertAero, dados);
        await conn.commit();
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeronave inserida.";
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
        res.render("cadastroAeronave");
    }
}
exports.cadastroAeronave = cadastroAeronave;
