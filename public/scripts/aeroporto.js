"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizarAeroportos = exports.cadastroAeroporto = void 0;
const database_1 = require("./database");
async function cadastroAeroporto(aeroporto, cidade, req, res) {
    try {
        const objeto = "Aeroporto";
        const sql = `
    INSERT INTO AEROPORTOS 
    (ID_AEROPORTO, NOME_AEROPORTO, CIDADE) 
    VALUES
    (SEQ_AEROPORTOS.NEXTVAL, :1, :2)
    `; // alterar as tabelas no banco
        const dados = [aeroporto, cidade];
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
        res.render("cadastroAeroporto");
    }
}
exports.cadastroAeroporto = cadastroAeroporto;
async function visualizarAeroportos(req, res) {
    try {
        const selectSql = `SELECT * FROM AEROPORTOS`;
        const result = await (0, database_1.selecionarSql)(selectSql, [], "Aeroportos");
        let dados;
        if (result) {
            dados = result.map((item) => ({
                idAeroporto: item[0],
                nomeAeroporto: item[1],
                cidade: item[2]
            }));
        }
        ;
        res.render("visualizarAeroporto", { aeroportos: dados });
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
exports.visualizarAeroportos = visualizarAeroportos;
