"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarAeronaves = exports.cadastroAeronave = void 0;
const database_1 = require("./database");
async function cadastroAeronave(modelo, numAssento, anoFabricacao, req, res) {
    try {
        const objeto = "Aeronave";
        const sql = `INSERT INTO AERONAVES 
   (ID_AERONAVE, MODELO, ANOFABRICACAO, NUM_ASSENTO)
   VALUES
   (SEQ_AERONAVES.NEXTVAL, :1, :2, :3)`;
        const dados = [modelo, numAssento, anoFabricacao];
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
        console.log(database_1.cr);
        res.render("cadastroAeronave");
    }
}
exports.cadastroAeronave = cadastroAeronave;
async function visualizarAeronaves(req, res) {
    try {
        const selectSql = `SELECT * FROM AERONAVES`;
        const result = await (0, database_1.selecionarSql)(selectSql, [], "Aeronaves");
        let dados;
        if (result) {
            dados = result.map((item) => ({
                idaeronave: item[0],
                modelo: item[1],
                anofabricacao: item[2],
                numassento: item[3],
            }));
        }
        ;
        res.render("visualizarAeronave", { aeronaves: dados });
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
exports.visualizarAeronaves = visualizarAeronaves;
