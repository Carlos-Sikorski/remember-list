const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lembretes = [];

function menu() {

    console.log("**SEJA BEM VINDO AO MENU**")
    rl.question("Digite a opção desejada[SOMENTE NUMEROS]\n[1]-Cadastrar Lembrete [2]-Listar Lembretes [3]-Editar Lembretes\n[4]-Marcar Concluído [5]-Excluir Lembretes [0]-Sair\nR:", (input) => {

        switch (i) {

            case '1': cadastrarLembrete();
                break;

            case '2': listarLembretes();
                break;

            case '3': editarLembretes();
                break;

            case '4': marcarConcluido();
                break;

            case '5': excluirLembrete();
                break;

            case '0': console.log("Até a próxima!")
                rl.close()

            default: console.log("Não entendi!\nDigite um número válido!")
                menu()
        }

    })

};

menu()