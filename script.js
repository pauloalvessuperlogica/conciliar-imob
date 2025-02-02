
function converterArquivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            // Assumindo que o arquivo TXT contém JSON válido
            try {
                const objeto = JSON.parse(fileContent);
                //document.getElementById('resultado').textContent = JSON.stringify(objeto, null, 2);
                exibeTabelas(objeto)
                let divResultado = document.getElementById('resultado');
                botaoConciliar = `
                    <button onclick="verificarDuplicados()">Procurar valores iguais</button>
                `;
                divResultado.innerHTML = botaoConciliar;
            } catch (error) {
                console.error('Erro ao analisar o JSON:', error);
                document.getElementById('resultado').textContent = 'O arquivo não é um JSON válido.';
            }
        };
        reader.readAsText(file);
    } else {
        alert('Selecione um arquivo');
    }
}

function toggleRow(checkbox) {
    var row = checkbox.closest('tr');
    if (checkbox.checked) {
        if (checkbox.name == "conciliar-banco") {
            somaSelecionados = document.getElementById("soma-selecionados-banco");
            valor = row.querySelector(".td-valor-banco");
        } else {
            somaSelecionados = document.getElementById("soma-selecionados-software");
            valor = row.querySelector(".td-valor-software");
        }
        row.style.backgroundColor = '#b494f8'; // Cor de fundo cinza claro
        row.style.textDecoration = 'line-through'; 

        if (somaSelecionados.textContent == "-") {
            acumulado = 0;
        } else {
            acumulado = parseFloat(somaSelecionados.textContent);
        }
        
        valorSelecionado = parseFloat(valor.textContent)
        soma = acumulado + valorSelecionado
        
        somaSelecionados.innerText = soma.toFixed(2) 
    } else {
        if (checkbox.name == "conciliar-banco") {
            somaSelecionados = document.getElementById("soma-selecionados-banco")
            valor = row.querySelector(".td-valor-banco");
        } else {
            somaSelecionados = document.getElementById("soma-selecionados-software")
            valor = row.querySelector(".td-valor-software");
        }

        row.style.backgroundColor = ''; 
        row.style.textDecoration = 'none';

        if (somaSelecionados.textContent == "-") {
            acumulado = 0;
        } else {
            acumulado = parseFloat(somaSelecionados.textContent);
        }
        valorSelecionado = parseFloat(valor.textContent)
        subtracao = acumulado - valorSelecionado
        
        if (subtracao === 0.00) {
            somaSelecionados.innerText = "-"    
        } else {
            somaSelecionados.innerText = subtracao.toFixed(2)   
        }
        
        
    }
}

function exibeTabelas (objeto){
    let sectionBanco = document.getElementById("tabela-banco");
    let sectionSoftware = document.getElementById("tabela-software");
    

    let resultadoBanco = "";
    let resultadoSoftware = "";

    objeto = objeto.data.itens
    

    if (objeto == 0){
        alert("arquivo sem informações");
      }
    
    for (i = 1; i < objeto.length; i++) {
        dado = objeto[i]
        //console.log(dado)
        if (dado.data_banco) {
            resultadoBanco += `
            <tr>
                <td class="td-data">${dado.data_banco}</td>
                <td>${dado.descricao_banco}</td>
                <td class="td-valor-banco">${dado.valor_banco}</td>
                <td><input type="checkbox" name="conciliar-banco" value="" onchange="toggleRow(this)"></td>
            </tr>
        `;
        }
        

        if (dado.data_software){
            resultadoSoftware += `
            <tr>
                <td class="td-data" >${dado.data_software}</td>
                <td>${dado.descricao_software}</td>
                <td class="td-valor-software">${dado.valor_software}</td>
                <td><input type="checkbox" name="conciliar-software" value="" onchange="toggleRow(this)"></td>
            </tr>
        `;
    
        }
        
    }

    tabelaIndices = `
            <thead>
                <tr class="nomes-colunas">
                    <th class= "td-data">Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`

    let tabelaBanco = tabelaIndices + resultadoBanco        
    let tabelaSoftware = tabelaIndices + resultadoSoftware


    //console.log('tabela banco ' +tabelaBanco) ;
    //console.log('tabela sof ' +tabelaSoftware) ;
         
    // Atribui os resultados gerados à seção HTML
    //section.innerHTML = resultado;
    
    sectionBanco.innerHTML = tabelaBanco;
    sectionSoftware.innerHTML = tabelaSoftware;
}

function verificarDuplicados(){
    console.log('verificarDuplicados');
    let resultadosBanco = document.getElementById("tabela-banco");
    let resultadosSoftware = document.getElementById("tabela-software");

    //console.log(resultadosBanco);
    //console.log(resultadosBanco.getElementsByTagName("tr"))
    const linhasBanco = resultadosBanco.querySelectorAll('td.td-valor-banco');
    const linhasSoftware = resultadosSoftware.querySelectorAll('td.td-valor-software');
   
    //console.log('linhasSoftwareArray: ' +linhasSoftwareArray)

    linhasBanco.forEach(element => {
        valorBanco = parseFloat(element.textContent);
        //console.log(valorBanco);
        
        linhasSoftware.forEach( elemento =>{
            valorSoftware = parseFloat(elemento.textContent);
            //console.log(valorSoftware);

            if (valorBanco === valorSoftware) {
                console.log(`Valor ${valorBanco} existe também no lado do software.`)

                const linha = elemento.closest('tr');
                // Aplicar um estilo para destacar a linha (ajuste conforme necessário)
                linha.style.backgroundColor = 'green';
                
                const linhab = element.closest('tr');
                // Aplicar um estilo para destacar a linha (ajuste conforme necessário)
                linhab.style.backgroundColor = 'green';

            }
        });
    });
    

}