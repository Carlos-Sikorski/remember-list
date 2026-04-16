const { stringify } = require("querystring");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const transData = (dados) => new Date(dados).toLocaleDateString('pt-br')
const transString = (dados) => dados.toString()

const lembretes = [];

const arrayCadastro = [];

let objetoCadastro = {
    tarefa: "",
    dataDeConclusao: new Date,
    prioridade: '',
    Endereco: '',
    status: ''
};


function menu() {

    console.log("**SEJA BEM VINDO AO MENU**")
    rl.question("Digite a opção desejada[SOMENTE NUMEROS]\n[1]-Cadastrar Lembrete [2]-Listar Lembretes [3]-Editar Lembretes\n[4]-Marcar Concluído [5]-Excluir Lembretes [0]-Sair\nR:", (input) => {
        let i = input
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

function resquest(solicitacao, tipo, funcao) {
    rl.question(`Digite ${solicitacao}: \nR: `, input => {
        const body = funcao(input)
        console.log(body);
        if (typeof (body) === typeof (tipo)) {
            arrayCadastro.push(body)
            cadastrarLembrete()
        }
    })
}

function cadastrarLembrete() {
    switch (true) {
        case (arrayCadastro.length == 0):
            resquest('o lembrete que deseja cadastrar', '', transString);
        case (arrayCadastro.length == 1):
            resquest('a data do seu compromisso neste formato mes/dia/ano', new Date, transData);
    }
}

function listarLembretes() {

    console.log("Seus lembretes são: ")

    lembretes.forEach(lembrete => {

        console.log(lembrete.tarefa)
        console.log(lembrete.dataDeConclusao)
        console.log(lembrete.endereco)
        console.log(lembrete.prioridade)
        console.log(lembrete.status)
        console.log("-------------------")

    })

    rl.question("Deseja sair ou voltar ao menu?\n[1]SAIR [2]MENU", (input) => {

        switch (input) {
            case '1': rl.close()
                break;
            case '2': menu()
                break;
        }
    })
}

/* console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'Aviso Importante');
console.log("\u001b[31mEste é um log de ERRO vermelho\u001b[0m");
console.log("\u001b[32mEste é um log de SUCESSO verde\u001b[0m"); */