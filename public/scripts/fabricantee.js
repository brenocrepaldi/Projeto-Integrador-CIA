"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirFabricante = exports.visualizarFabricante = exports.cadastroFabricante = void 0;
const databasee_1 = require("./databasee");
function cadastroFabricante(req, res) {
    const fabricante = req.body.fabricante; //pegando os dados do input fabricante no body
    const sql = `insert into fabricante (fabricante) values ('${fabricante}');`;
    (0, databasee_1.executaSql)(sql);
}
exports.cadastroFabricante = cadastroFabricante;
function visualizarFabricante(req, res) {
    const sql = `select * from fabricante`;
    databasee_1.conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        const fabricantes = data;
        res.render("visualizarFabricante", { fabricantes }); //passando a pagina e os dados
    });
}
exports.visualizarFabricante = visualizarFabricante;
function excluirFabricante() { }
exports.excluirFabricante = excluirFabricante;
