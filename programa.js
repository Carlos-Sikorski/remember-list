const console = require("console");
const { stringify } = require("querystring");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const transData = (dados) => new Date(dados)
const transString = (dados) => dados.toString()

const lembretes = [];
const prioridade = ['baixa', 'média', 'alta']

let arrayCadastro = 0

let objetoCadastro = {
    id: 0,
    tarefa: "",
    dataDeConclusao: new Date,
    endereco: '',
    prioridade: '',
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

function resquest(solicitacao, tipo, funcao, propriedade) {
    rl.question(`Digite ${solicitacao}: \nR: `, input => {
        const body = funcao(input)
        console.log(body);
        if (typeof (body) === typeof (tipo)) {
            if (propriedade === 'dataDeConclusao') {
                let novaData = new Date(body).toLocaleDateString('pt-br')
                objetoCadastro[propriedade] = novaData
                arrayCadastro++
                cadastrarLembrete()
            } else {
                objetoCadastro[propriedade] = body
                arrayCadastro++
                cadastrarLembrete()
            }
        }
    })
}

function resquestPrioridade(propriedade) {
    rl.question(`Selecione o numero referente a prioridade [0] baixa   [1] média   [2] alta\nR: `, input => {
        const i = parseInt(input)
        if (isNaN(i) || i > 2 || i < 0) {
            console.log('Você selecionou uma opção invalida! Tente novamente...');
            resquestPrioridade()
        } else {
            const priori = prioridade[i]
            objetoCadastro[propriedade] = priori
            arrayCadastro++
            cadastrarLembrete()
        }

    })
}

function cadastrarLembrete() {
    switch (true) {
        case (arrayCadastro == 0):
            resquest('o tarefa que deseja cadastrar', objetoCadastro.tarefa, transString, 'tarefa');
            break;
        case (arrayCadastro == 1):
            resquest('a data do seu compromisso neste formato mes/dia/ano', objetoCadastro.dataDeConclusao, transData, 'dataDeConclusao');
            break;
        case (arrayCadastro == 2):
            resquest('a o endereço para realizar a tarefa (se existente)', objetoCadastro.endereco, transString, 'endereco');
            break;
        case (arrayCadastro == 3):
            resquestPrioridade('prioridade');
            break;

        default:
            objetoCadastro.id = lembretes.length + 1
            objetoCadastro.status = 'Pendente'
            lembretes.push(objetoCadastro)
            console.log(`Usuario Cadastrado com SUCESSO!!`)
            console.log(lembretes)
            menu()
    }
}

/* console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'Aviso Importante');
console.log("\u001b[31mEste é um log de ERRO vermelho\u001b[0m");
console.log("\u001b[32mEste é um log de SUCESSO verde\u001b[0m"); */