"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const databasee_1 = require("./databasee");
const fabricantee_1 = require("./fabricantee");
const aeronavee_1 = require("./aeronavee");
const aeroportoo_1 = require("./aeroportoo");
(0, databasee_1.abreConexao)();
exports.app = (0, express_1.default)();
exports.app.use(
  //configurando o express para pegar o body
  express_1.default.urlencoded({
    extended: true,
  })
);
exports.app.use(express_1.default.json()); //pegar o body em json
const hbs = express_handlebars_1.create({
  //configurando diretório partials
  partialsDir: ["views/partials"],
});
// app.engine(
//   "handlebars",
//   exphbs.engine({
//     defaultLayout: "main", // Nome do layout padrão (main.handlebars)
//     layoutsDir: path.join(__dirname, "views", "layouts"), // Pasta de layouts
//     partialsDir: path.join(__dirname, "views", "partials"), // Pasta de partials
//   })
// );
exports.app.engine("handlebars", hbs.engine);
exports.app.set("view engine", "handlebars");
exports.app.use(express_1.default.static("public")); //configurando pra receber o css, definindo a pasta public como static
exports.app.get("/cadastro/fabricante", (req, res) => {
  res.render("cadastroFabricante");
});
exports.app.post("/cadastro/fabricante", (req, res) => {
  (0, fabricantee_1.cadastroFabricante)(req, res);
  res.render("cadastroFabricante");
});
exports.app.get("/visualizar/fabricante", (req, res) => {
  (0, fabricantee_1.visualizarFabricante)(req, res);
});
exports.app.get("/editar/fabricante/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select fabricante from fabricante where idfabricante=${id}`;
  databasee_1.conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricante = data;
    res.render("editFabricante", { fabricante });
  });
});
exports.app.get("/cadastro/aeronave", (req, res) => {
  const sql = "select fabricante from fabricante ";
  databasee_1.conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const fabricante = data;
    res.render("cadastroAeronave", { fabricante });
  });
});
exports.app.post("/cadastro/aeronave", (req, res) => {
  (0, aeronavee_1.cadastroAeronave)(req, res);
});
exports.app.get("/visualizar/aeronave", (req, res) => {
  (0, aeronavee_1.visualizaAeronave)(req, res);
});
exports.app.get("/editar/aeronave/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select * from aeronave where idaeronave=${id}`;
  databasee_1.conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const aeronave = data;
    res.render("cadastroAeronave", { aeronave });
  });
});
exports.app.get("/cadastro/aeroporto", (req, res) => {
  res.render("cadastroAeroporto");
});
exports.app.post("/cadastro/aeroporto", (req, res) => {
  (0, aeroportoo_1.cadastroAeroporto)(req, res);
});
exports.app.get("/visualizar/aeroporto", (req, res) => {
  (0, aeroportoo_1.visualizaAeroporto)(req, res);
});
exports.app.use("/visualizar/voo", (req, res) => {
  const sql = "select * from voo";
  (0, databasee_1.executaSql)(sql);
});
exports.app.get("/cadastro/voo", (req, res) => {
  const sql = "select * from trecho";
  databasee_1.conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const trechos = data;
    res.render("cadastroVoo", { trechos });
  });
});
exports.app.listen(3333, () => {
  console.log("App funcionando");
});
