import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Substitua 'db.json' pelo caminho do seu arquivo JSON
const middlewares = jsonServer.defaults();

// Usar o middleware padrão
server.use(middlewares);

// Usar o middleware CORS
server.use(cors());

// Usar o roteador
server.use("/api", router); // Você pode alterar o prefixo se desejar

// Iniciar o servidor
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
