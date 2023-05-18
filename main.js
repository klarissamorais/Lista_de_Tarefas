const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');//essa função cria o eleemnto em html que botar dentro;
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {//captura quando a tecla com o código especificado a baixo for clicada
    if(e.keyCode === 13){//código da tecla que se quer capturar e fazer determinada ação, isso ver em inspecionar no site
        if(!inputTarefa.value) return;//retorna a entrada do que foi colocado em inputTarefa
        criaTarefa(inputTarefa.value)//essa função está recebendo o que colocar em inputTarefa
    }
});

function limpaInput(){
    inputTarefa.value = '';//vai limpar a caixa
    inputTarefa.focus();//vai colocar pro cursor ficar piscando esperando a proxima tarefa
}

function criaBotaoApagar(li){
    const criaBotaoApagar = document.createElement('button');
    criaBotaoApagar.innerHTML='Apagar';
    criaBotaoApagar.setAttribute('class', 'apagar');//vai criar uma classe no html dentro do botão apaga sem mecher no html
    criaBotaoApagar.setAttribute('title', 'Apagar essa tarefa especifica');//vai criar um titlo no botão
    li.appendChild(criaBotaoApagar);

}
function criaTarefa(textoInput){//vai acoplar um intem da lista criada em criaLi com o que receber de  inputTarefa.value
    const li = criaLi();//cria a lista
    li.innerText = textoInput;//aparece nela o que foi posto na caixinha
    tarefas.appendChild(li);//adiciona uma abixo da outra
    limpaInput();//limpa o que foi escrito anteriormente
    criaBotaoApagar(li);//adiciona a função do botão na listagem
    salvarTarefas();
}


btnTarefa.addEventListener('click', function() { //quando ele capturar esse evento ele entra dentro dessa função criaTarefa
    if(!inputTarefa.value) return;//retorna a entrada do que foi colocado em inputTarefa
    criaTarefa(inputTarefa.value)//essa função está recebendo o que colocar em inputTarefa
});

document.addEventListener('click', function(e) {
    const elemento = e.target;//pra ve qual elemento ta clicando e checar la embaixo se for o de apaga mesmo
    if(elemento.classList.contains('apagar')){//se ele contém a classe apagar
        elemento.parentElement.remove();//vai apartir da hierarquia remover o li associado ao botão, por isso parenteElement
        salvarTarefas();//atualiza o que foi removido
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');//ele pega todos os itens
    const listaDetarefas = []; //criada pra salvar os itens das litagens anteriores

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// vai tirar o apagar que vem com o item e o espaço em branco do lado com trim
        listaDetarefas.push(tarefaTexto);//adicona os item no array
    }

    const tarefasJSON =JSON.stringify(listaDetarefas);//salva em uma string que depois pode ser convertida em array, porque vai poder modificada de qualquer jeito
    localStorage.setItem('tarefas', tarefasJSON);// é como um mine servidor no navegador então você vai setar o dado recebido como string, ele só guarda se for string desse jeito, por isso utilizou o json e depois pode ser recuperado, e utiliza o nome tarefas pra recuperar o que foi guardado no json

}

function adiconaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');//chamou de volta o que estava guardado
    const listaDetarefas =JSON.parse(tarefas);//transformou de volta em array
    
    for(let tarefa of listaDetarefas){
        criaTarefa(tarefa);
    }
}

adiconaTarefasSalvas();