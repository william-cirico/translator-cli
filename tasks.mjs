import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs/promises";


const loadTasks = async () => {
    try {
        const data = await fs.readFile("tasks.json", "utf-8");
        const tasks = JSON.parse(data);

        return tasks;
    } catch (error) {
        return [];
    }
};

const saveTasks = async (tasks) => {
    try {
        await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 4));
    } catch (error) {
        console.log(chalk.red("Falha ao salvar as tarefas"));
    }
};


// Inicializar o commander
const program = new Command();

// Definir as informações da CLI
program
    .name("tasks-cli")
    .description("CLI para gerencias as tarefas do dia-a-dia")
    .version("1.0.0");

program.command("add")
    .description("Adiciona uma nova tarefa na lista")
    .requiredOption("-t, --title <title>", "Título da nova tarefa")
    .requiredOption("-d, --description <description>", "Descrição da nova tarefa")
    .action(async (options) => {
        const { title, description } = options;  
        
        // Carregando as tarefas do arquivo
        const tasks = await loadTasks();

        // Criando o objeto da nova tarefa
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            completed: false,
        };

        // Salvando a nova tarefa na lista de tarefas
        tasks.push(newTask);

        // Salvando as tarefas atualizadas no arquivo
        await saveTasks(tasks);

        console.log(chalk.green("Nova tarefa adicionada com sucesso!"));
    });

program.command("list")
    .description("Lista as tarefas cadastradas")
    .action(async () => {
        const tasks = await loadTasks();

        tasks.forEach(task => console.log(`#${task.id} ${task.title}: ${task.description} - ${task.completed}`));
    });

program.command("remove")
    .description("Remove uma tarefa da lista")
    .requiredOption("--id <id>", "ID da tarefa")
    .action(async (options) => {
        const { id } = options;

        // Carregar as tarefas
        const tasks = await loadTasks();

        // Filtrar as tarefas cujo ID é diferente do id da tarefa removida
        const tasksToKeep = tasks.filter(task => task.id !== Number(id));

        // Salvar as tarefas
        await saveTasks(tasksToKeep);

        console.log(chalk.green("Tarefa removida com sucesso!"));
    });

program.command("complete")
    .description("Marca uma tarefa como concluída")
    .requiredOption("--id <id>", "ID da tarefa")
    .action(async (options) => {
        const { id } = options;

        // Carregar as tarefas
        const tasks = await loadTasks();

        // Buscar a tarefa pelo ID
        const task = tasks.find(task => task.id === Number(id));

        if (task) {
            task.completed = true;

            // Atualizando o arquivo
            await saveTasks(tasks);

            console.log(chalk.green("Tarefa atualizada com sucesso!"));
        } else {
            console.log(chalk.red("Tarefa não encontrada"));
        }
    });

// Parsing dos argumentos da CLI
program.parse(process.argv);

