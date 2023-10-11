"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroTrecho = void 0;
const database_1 = require("./database");
async function cadastroTrecho(AeroportoSaida, AeroportoChegada, req, res) {
    try {
        let objeto = "Trecho";
        const sql = ``;
        const dados = [AeroportoSaida, AeroportoChegada];
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
        res.render("cadastroTrecho");
    }
}
exports.cadastroTrecho = cadastroTrecho;
