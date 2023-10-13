"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarVoos = exports.cadastroVoo = void 0;
const database_1 = require("./database");
async function cadastroVoo(valor, req, res) {
    try {
        let objeto = "Voo";
        const sql = `INSERT INTO VOO 
   (ID_VOO, VALOR)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`; // alterar tabela no banco
        const dados = [valor];
        (0, database_1.inserirSql)(sql, dados, objeto);
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
async function visualizarVoos(req, res) {
    try {
        const selectSql = `SELECT * FROM VOO`;
        const result = await (0, database_1.selecionarSql)(selectSql, [], "Voos");
        let dados;
        if (result) {
            dados = result.map((item) => ({
                idVoo: item[0],
                aeroportoSaida: item[1],
                aeroportoChegada: item[2],
                valor: item[3],
            }));
        }
        res.render("visualizarVoo", { voos: dados });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
        }
        else {
            database_1.cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
}
exports.visualizarVoos = visualizarVoos;
