import express from "express";
import { create } from "express-handlebars";
import * as dotenv from "dotenv";
import { routerFabricante } from "./routes/fabricanteRoutes";
import { routerAeronave } from "./routes/aeronaveRoutes";
import { routerAeroporto } from "./routes/aeroportoRoutes";
import { routerTrecho } from "./routes/trechoRoutes";
import { routerVoo } from "./routes/vooRoutes";
import { routerHome } from "./routes/homeRoutes";
import { conn } from "./db/database";

const app = express();

dotenv.config(); //permitinado acesso as variáveis do arquivo .env
app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //pegar o body em json
const hbs = create({
  //configurando diretório partials do handlebars
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine); //configurações para usar o handlebars
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public/")); //configurando pra receber o css, definindo a pasta public como static
//routes
app.use("/", routerFabricante); //rotas do fabricante
app.use("/", routerAeronave); //rotas da aeronave
app.use("/", routerAeroporto); //rotas do aeroporto
app.use("/", routerTrecho); //rotas do trecho
app.use("/", routerVoo); //rotas do voo
app.use("/", routerHome); //rotas da home

app.listen(3333, async () => {
  try {
    if (await conn) {
      console.log("App funcionando em http://localhost:3333/dashboard");
    }
  } catch (error) {
    console.log("Erro ao conectar no banco de dados");
  }
});
