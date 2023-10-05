"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizaAeroporto = exports.cadastroAeroporto = void 0;
const databasee_1 = require("./databasee");
function cadastroAeroporto(req, res) {
    const aeroporto = req.body.aeroporto;
    const cidade = req.body.cidade;
    const sql = `insert into aeroporto (aeroporto, cidade) values ('${aeroporto}', '${cidade}');`;
    (0, databasee_1.executaSql)(sql);
}
exports.cadastroAeroporto = cadastroAeroporto;
function visualizaAeroporto(req, res) {
    const sql = "select a.aeroporto, c.cidade from aeroporto a, cidade c where a.idcidade=c.idcidade";
    databasee_1.conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const aeroportos = data;
        res.render("visualizarAeroporto", { aeroportos });
    });
}
exports.visualizaAeroporto = visualizaAeroporto;
