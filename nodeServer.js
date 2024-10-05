const http = require("node:http");

// Criando o servidor
const server = http.createServer((req, res) => {
    const author = "William";

    if (req.url === "/") {
        return res.end("<h1>Servidor está rodando...</h1>");
    } else {
        return res.end(`<h1>Outra URL. Autor: ${author}</h1>`);
    }
});

// Defina a porta em que o servidor irá funcionar
const PORT = 8080;

// Colocando o servidor para rodar
server.listen(PORT, () => {
    console.log(`Servidor está rodando em: http://localhost:${PORT}`);
})