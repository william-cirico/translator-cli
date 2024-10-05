const express = require("express");
const path = require("node:path");

// Instânciar o express
const app = express();

/* Métodos HTTP:
GET - Obter recursos
POST - Criar recursos
*/
const PAGES_PATH = path.join(__dirname, "pages");

app.set("view engine", "ejs");
app.set("views", PAGES_PATH);

// Configurando o express para lidar com arquivos estáticos
app.use("/static", express.static("public"));

// Adicionando uma rota ao servidor
app.get("/", (req, res) => {
    res.sendFile(path.join(PAGES_PATH, "index.html"));
});

app.get("/fotos", (req, res) => {
    res.sendFile(path.join(PAGES_PATH, "fotos.html"));
});

// Adicionando uma rota com conteúdo dinâmico
app.get("/contato", (req, res) => {
    const contactData = {
        name: "William",
        email: "william@email.com",
        phone: "(47) 9 9999-9999"
    };

    // Renderizar a página com o conteúdo
    res.render("contato", { contactData });
});

// Banco de dados de viagens
const travels = [
    { 
        id: 1, 
        destination: "Um lugar qualquer", 
        date: "2024-10-05",
        photos: [
            "https://www.viagensecaminhos.com/wp-content/uploads/2017/08/ilha-do-mel-1.jpg",
            "https://www.guiailhadomel.com/fotos/201-300/fFoto-250-1.jpg",
        ],
    },
];

// Adicionando uma rota dinâmica
app.get("/viagens/:id", (req, res) => {
    const id = Number(req.params.id);

    // Procurar a viagem no banco
    const travel = travels.find(travel => travel.id === id);

    if (!travel) {
        return res.send("<h1>Viagem não encontrada</h1>");
    }

    res.render("detalhes-viagem", { travel });
});

const PORT = 8080;

// Fazendo com o que servidor rode
app.listen(PORT, () => {
    console.log(`O servidor está rodando em: http://localhost:${PORT}`);
});