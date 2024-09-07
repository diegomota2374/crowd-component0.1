const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // O arquivo JSON com seus dados
const middlewares = jsonServer.defaults();

// Usar o middleware padrão
server.use(middlewares);

// Usar o middleware cors
server.use(cors());

// Usar o roteador
server.use("/api", router); // Você pode alterar o prefixo se desejar

// Iniciar o servidor
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
