"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroVoo = void 0;
const database_1 = require("./database");
async function cadastroVoo(valor, req, res) {
    try {
        let objeto = "Voo";
        const sql = `INSERT INTO VOO 
   (ID_VOO, VALOR)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`; // alterar tabela no banco
        const dados = [valor];
        (0, database_1.executaSql)(sql, dados, objeto);
    }
    catch (e) {
        if (e instanceof Error) {
            database_1.cr.message = e.message;
            console.log(e.message);
        }
        else {
            database_1.cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        res.render("cadastroVoo");
    }
}
exports.cadastroVoo = cadastroVoo;
