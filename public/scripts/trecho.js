"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroTrecho = void 0;
const database_1 = require("./database");
async function cadastroTrecho(idAeroportoSaida, idAeroportoChegada, req, res) {
    try {
        let objeto = "Trecho";
        const sql = `
    INSERT INTO TRECHO
      (ID_TRECHO, ID_AEROPORTO_SAIDA, ID_AEROPORTO_CHEGADA)
    VALUES
      (SEQ_TRECHO.NEXTVAL, :1, :2)`;
        const dados = [idAeroportoSaida, idAeroportoChegada];
        console.log(dados);
        (0, database_1.executarSql)(sql, dados, objeto);
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
        res.render("cadastroTrecho");
    }
}
exports.cadastroTrecho = cadastroTrecho;
