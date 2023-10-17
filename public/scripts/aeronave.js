"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarAeronaves = exports.cadastroAeronave = void 0;
const database_1 = require("./database");
async function cadastroAeronave(modelo, numAssento, anoFabricacao, registro, status, idFabricante, req, res) {
    try {
        const objeto = "Aeronave";
        const sql = `INSERT INTO AERONAVE 
   (ID_AERONAVE, MODELO, NUM_ASSENTO,REGISTRO,STATUS,ANO_FABRICACAO,ID_FABRICANTE )
   VALUES
   (SEQ_AERONAVE.NEXTVAL, :1, :2, :3,:4,:5,:6)`;
        const dados = [
            modelo,
            numAssento,
            registro,
            status,
            anoFabricacao,
            idFabricante,
        ];
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
        console.log(database_1.cr);
        res.render("cadastroAeronave");
    }
}
exports.cadastroAeronave = cadastroAeronave;
async function visualizarAeronaves(req, res) {
    try {
        const selectSql = `
    SELECT A.ID_AERONAVE, A.MODELO, A.NUM_ASSENTO, A.REGISTRO, A.STATUS, A.ANO_FABRICACAO, F.NOME_FABRICANTE FROM  AERONAVE A, FABRICANTE F WHERE A.ID_FABRICANTE = F.ID_FABRICANTE ORDER BY A.ID_AERONAVE`;
        const result = (await (0, database_1.selecionarSql)(selectSql, [], "Aeronaves"));
        let dados;
        if (result) {
            dados = result.map((item) => ({
                idAeronave: item[0],
                modelo: item[1],
                numassento: item[2],
                registro: item[3],
                status: item[4],
                anoFabricacao: item[5],
                fabricante: item[6],
            }));
        }
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
