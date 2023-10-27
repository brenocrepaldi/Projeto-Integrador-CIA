"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarFabricante = exports.cadastroFabricante = void 0;
const database_1 = require("./database");
async function cadastroFabricante(fabricante, req, res) {
    try {
        let objeto = "Fabricante";
        const sql = `
    INSERT INTO FABRICANTE 
      (ID_FABRICANTE, NOME_FABRICANTE)
    VALUES
      (SEQ_FABRICANTE.NEXTVAL, :1)
    `;
        const dados = [fabricante];
        if (await (0, database_1.executarSql)(sql, dados, objeto)) {
            res.render("modal");
        }
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
        console.log(database_1.cr);
        //res.render("cadastroFabricante");
    }
}
exports.cadastroFabricante = cadastroFabricante;
async function visualizarFabricante(req, res) {
    try {
        const selectSql = `SELECT * FROM FABRICANTE ORDER BY ID_FABRICANTE`;
        const result = (await (0, database_1.retornarDados)(selectSql, [], "Fabricantes"));
        let dados;
        if (result) {
            dados = result.map((item) => ({
                idFabricante: item[0],
                nomeFabricante: item[1],
            }));
        }
        res.render("visualizarFabricante", { fabricantes: dados });
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
