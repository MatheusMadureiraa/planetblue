function limparFormulario() {
    var form = document.getElementById("form");
    var i;
    for (i=0; i<form.elements.length; i++) { // Percorrer todos os elementos do formulário
        var input = form.elements[i];
        if (input.tagName === "INPUT" && input.value!== "Enviar" && input.value!=="Limpar") {
            input.value = ""; // Limpar os inputs, exceto os botões 'Limpar' e 'Enviar'
        }
    }
}

var contEnviar=0; // Contador de cliques no botão enviar
var contID=0; // Contador para os IDs do localStorage
var listContainer;
function adicionarLista() {
    contEnviar++;
    if (contEnviar==1){ // Realizar o 'if' apenas no primeiro click
        var footer = document.createElement("footer");
        footer.id = "footer";
        listContainer = document.createElement("ul");
        listContainer.id = "listContainer";
        footer.appendChild(listContainer);
        document.body.appendChild(footer);
        excluirLista();
    }

    // Adicionar à lista
    let nome = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let listChild = document.createElement("li");
    let date = new Date();
    let dia = date.getDate(); 
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let dataCompleta = `${dia}/${mes}/${ano}`; // Armazenar data completa
    let text = document.createTextNode(`${dataCompleta} - Nome: ${nome}, Email: ${email}`); // Texto de cada linha da lista
    listChild.appendChild(text);

    // Adicionar ao LocalStorage
    contID++;
    let id = contID;
    let chaveLocalStorage = `${id}`;
    localStorage.setItem(chaveLocalStorage, JSON.stringify({Data: dataCompleta, Nome: nome, Email: email}));

    var botao = document.createElement("button");// Criar botão excluir para cada linha
    botao.textContent = "x";
    botao.classList.add("botaoExcluir");
    listChild.appendChild(botao);
    botao.onclick = function () {
        excluirItem(listChild, chaveLocalStorage);
    }
    listContainer.appendChild(listChild);
}

function excluirItem(excluirList, excluirLS) {
    listContainer.removeChild(excluirList);
    localStorage.removeItem(excluirLS);
}

function excluirLista() {
    let botaoLimpar = document.createElement("button");
    botaoLimpar.textContent = "Limpar";
    botaoLimpar.id = "botaoLimpar";
    let footer = document.getElementById("footer");
    footer.appendChild(botaoLimpar); // Criando e introduzindo botão ao footer

    botaoLimpar.onclick = function() {
        listContainer.innerHTML = '';
        for (let i=0; i<=contID; i++) {
            localStorage.removeItem(i);
        }
        contID = 0;
        contEnviar = 0; // Zera para caso seja preenchido o  formulário novamente
        footer.remove(); // Excluir footer para não mostra-lo vazio na tela
    }
}

function pesquisarLista() {
    let pesquisa = document.getElementById("pesquisa").value; // Pegar o valor digitado
    let pesquisaMinusc = pesquisa.toLowerCase(); // Valor minúsculo para comparar
    let li = document.querySelectorAll("#listContainer li");

    li.forEach(function(itemLista) {
        let textoItem = itemLista.textContent;
        let textoItemMinusc = textoItem.toLowerCase(); // Deixar o texto da linha em minúsculo

        if (textoItemMinusc.includes(pesquisaMinusc)) { // Entra se o texto digitado for igual a um existente na lista
            itemLista.style.display = 'block'; // Mostrar o item 
        } else {
            itemLista.style.display = 'none'; // Ocultar o item
        }
    });
}

