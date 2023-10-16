"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarFabricante = exports.cadastroFabricante = void 0;
const database_1 = require("./database");
async function cadastroFabricante(fabricante, req, res) {
    try {
        let objeto = "Fabricante";
        const sql = `INSERT INTO FABRICANTE 
   (ID_FABRICANTE, NOME_FABRICANTE)
   VALUES
   (SEQ_FABRICANTE.NEXTVAL, :1)`;
        const dados = [fabricante];
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
        res.render("cadastroFabricante");
    }
}
exports.cadastroFabricante = cadastroFabricante;
async function visualizarFabricante(req, res) {
    try {
        const selectSql = `SELECT * FROM FABRICANTE`;
        const result = (await (0, database_1.selecionarSql)(selectSql, [], "Fabricantes"));
        let dados;
        if (result) {
            dados = result.map((item) => ({
                fabricante: item[1],
                idFabricante: item[0],
            }));
        }
        res.render("visualizarFabricante", { fabricante: dados });
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
exports.visualizarFabricante = visualizarFabricante;
