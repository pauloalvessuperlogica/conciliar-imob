
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
        row.style.backgroundColor = '#b494f8'; // Cor de fundo cinza claro
        row.style.textDecoration = 'line-through'; 
    } else {
        row.style.backgroundColor = ''; 
        row.style.textDecoration = 'none'; 
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
                <td>${dado.data_banco}</td>
                <td>${dado.descricao_banco}</td>
                <td>${dado.valor_banco}</td>
                <td><input type="checkbox" name="conciliar" value="" onchange="toggleRow(this)"></td>
            </tr>
        `;
        }
        

        if (dado.data_software){
            resultadoSoftware += `
            <tr>
                <td>${dado.data_software}</td>
                <td>${dado.descricao_software}</td>
                <td>${dado.valor_software}</td>
                <td><input type="checkbox" name="conciliar" value="" onchange="toggleRow(this)"></td>
            </tr>
        `;
    
        }
        
    }

    tabelaIndices = `
            <thead>
                <tr class="nomes-colunas">
                    <th>Data</th>
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


