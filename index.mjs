import chalk from "chalk";
import { Command } from "commander";
import { translate } from "@vitalets/google-translate-api";
import ora from "ora";

// Inicializar o commander
const program = new Command();

// Definir as informações da CLI
program
    .version("1.0.0")
    .description("CLI para traduzir textos para diferentes idiomas usando a API Google Translate")
    .requiredOption("-t, --text <text>", "Texto a ser traduzido")
    .requiredOption("-l, --language <language>", "Língua para qual o texto será traduzido (ex.: pt, en, es, etc.)")
    .option("-s, --source <source>", "Língua de origem (opcional, padrão: auto)", "auto");

const runTranslation = async (text, to, from) => {
    const spinner = ora(chalk.blue("Traduzindo o texto...")).start();
    
    try {
        // Traduzir o texto
        const res = await translate(text, { to, from });

        // Parar o spinner
        spinner.succeed(chalk.green("Tradução completa!"));

        // Mostrar o texto traduzido
        console.log(chalk.yellow(`Tradução: [${chalk.cyan(from)}] -> [${chalk.cyan(to)}]:`));
        console.log(res.text);
    } catch (error) {
        spinner.fail(chalk.red("Erro ao traduzir o texto"));
    }
};


// Definir ação da CLI
program.action((options) => {
    const { text, language, source } = options;
    runTranslation(text, language, source);
});

// Ler os dados do terminal
program.parse(process.argv);