const console = require("console");
const { type } = require("os");
const { stringify } = require("querystring");
const readline = require("readline");
const { isNumberObject } = require("util/types");
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
        let i = Number(input)
        switch (i) {

            case 1: cadastrarLembrete();

                break;

            case 2: listarLembretes();
                break;

            case 3: editarLembretes();
                break;

            case 4: marcarConcluido();
                break;

            case 5: excluirLembrete();
                break;

            case 0: console.log("Até a próxima!")
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
            resquest('o tarefa que deseja cadastrar', '', transString, 'tarefa');
            break;
        case (arrayCadastro == 1):
            resquest('a data do seu compromisso neste formato mes/dia/ano', new Date, transData, 'dataDeConclusao');
            break;
        case (arrayCadastro == 2):
            resquest('a o endereço para realizar a tarefa (se existente)', '', transString, 'endereco');
            break;
        case (arrayCadastro == 3):
            resquestPrioridade('prioridade');
            break;

        default:


            objetoCadastro.id = lembretes.length + 1
            objetoCadastro.status = 'Pendente';
            const teste = JSON.parse(JSON.stringify(objetoCadastro));
            /* const novoLembrete = {
                tarefa: objetoCadastro.tarefa,

            } */
            lembretes.push(teste);
            arrayCadastro = 0
            console.log(`Usuario Cadastrado com SUCESSO!!`)
            console.log(lembretes)

            menu()
    }
}

function listarLembretes() {

    console.log("Seus lembretes são: ")

    lembretes.forEach(lembrete => {


        console.log(lembrete.id)
        console.log(lembrete.tarefa)
        console.log(lembrete.dataDeConclusao)
        console.log(lembrete.endereco)
        console.log(lembrete.prioridade)
        console.log(lembrete.status)
        console.log("-------------------")

    })

    rl.question("Deseja sair ou voltar ao menu?\n[1]SAIR [2]MENU\nR:", (input) => {

        let userChose = parseInt(input)

        switch (userChose) {
            case 1: rl.close()
                break;
            case 2: menu()
                break;
        }
    })
}

function editarLembretes() {

    console.log("Seus lembretes são: ")

    lembretes.forEach(lembrete => {

        console.log(lembrete.tarefa)
        console.log(lembrete.dataDeConclusao)
        console.log(lembrete.endereco)
        console.log(lembrete.prioridade)
        console.log(lembrete.status)
        console.log("-------------------")

    })

    rl.question("Digite o código da tarefa que deseja editar\nR: ", (input2) => {

        let editarNum = parseInt(input2)
        console.log(typeof (editarNum))

        if (isNaN(editarNum)) {

            console.log("Desculpe, você não digitou um número. Tente novamente!")
            editarLembretes()


        }
        else {

            for (let i = 0; i < lembretes.length; i++) {

                if (i + 1 === editarNum) {

                    editarTarefa(i)

                } else {
                    console.log("Não entendi, tente novamente.")
                    editarLembretes()
                }
            }
        }

    })

}

function voltarMenu() {

    rl.question("Deseja editar mais alguma coisa?\n[1]Sim\n[2]Não\nR: ", (input5) => {
        let entradaUser = parseInt(input5)
        switch (entradaUser) {
            case 1: editarTarefa();
                break;
            case 2: menu();
                break;
        }
})
}

function editarTarefa(i) {

    rl.question("Entendi! Qual informação você deseja editar?\n[1]Tarefa\n[2]Data de Conclusão\n[3]Endereço\n[4]Prioridade\nR:", (input3) => {

        if(isNaN(input3)) {

            console.log("Você não digitou uma escolha válida! Tente noavmente!")
            editarTarefa(i)

        }

        else {

        let editarInfo = parseInt(input3)

        switch (editarInfo) {

            case 1:
                rl.question("Digite a nova tarefa\nR:", (input4) => {
                    let novaTarefa = input4.toString()
                    lembretes[i].tarefa = novaTarefa;
                    console.log("Tarefa editada com sucesso!")
                    voltarMenu()
                })

            case 2: rl.question("Digite a nova data[FORMATO MES/DIA/ANO\nR:", (input6) => {
                let novaData = new Date(input6).toLocaleDateString("pt-br");
                lembretes[i].dataDeConclusao = novaData;
                console.log("Data de conclusão editada com sucesso!")
                voltarMenu()

            })
        }
    }

    })
}

/* console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'Aviso Importante');
console.log("\u001b[31mEste é um log de ERRO vermelho\u001b[0m");
console.log("\u001b[32mEste é um log de SUCESSO verde\u001b[0m"); */
