"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroAeronave = void 0;
const databasee_1 = require("./databasee");
async function cadastroAeronave(modelo, numAssento, anoFabricacao, req, res) {
    try {
        const sql = `INSERT INTO AERONAVES 
   (ID_AERONAVE, MODELO, ANOFABRICACAO, NUM_ASSENTO)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1, :2, :3)`;
        const dados = [modelo, numAssento, anoFabricacao];
        (0, databasee_1.executaSql)(sql, dados);
    }
    catch (e) {
        if (e instanceof Error) {
            databasee_1.cr.message = e.message;
            console.log(e.message);
        }
        else {
            databasee_1.cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        res.render("cadastroAeronave");
    }
}
exports.cadastroAeronave = cadastroAeronave;
