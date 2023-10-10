"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// servicos de backend
// export async function executaSql(
//   sql: string,
//   coluna: string,
//   req: Request,
//   res: Response
// ) {
//   let cr: CustomResponse = { status: "ERROR", message: "", payload: undefined };
//   try {
//     let conn = await oracledb.getConnection({
//       user: process.env.ORACLE_USER,
//       password: process.env.ORACLE_PASSWORD,
//       connectionString: process.env.ORACLE_STR,
//     });
//     const cmdInsertAero = `INSERT INTO FABRICANTE
//    (ID_FABRICANTE, NOME_FABRICANTE)
//    VALUES
//    (SEQ_AERONAVES.NEXTVAL, :1)`;
//     const dados = [coluna];
//     let resInsert = await conn.execute(cmdInsertAero, dados);
//     // importante: efetuar o commit para gravar no Oracle.
//     await conn.commit();
//     // obter a informação de quantas linhas foram inseridas.
//     // neste caso precisa ser exatamente 1
//     const rowsInserted = resInsert.rowsAffected;
//     if (rowsInserted !== undefined && rowsInserted === 1) {
//       cr.status = "SUCCESS";
//       cr.message = "Fabricante inserida.";
//     }
//   } catch (e) {
//     if (e instanceof Error) {
//       cr.message = e.message;
//       console.log(e.message);
//     } else {
//       cr.message = "Erro ao conectar ao oracle. Sem detalhes";
//     }
//   } finally {
//     res.send(cr);
//   }
// }
