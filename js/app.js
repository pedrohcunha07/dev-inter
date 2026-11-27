// Banco de dados inicial simulados
let veiculos = [
    {id: 1, placa: "BRA-2E19", modelo: "Volvo FH 540", motorista: "João Pereira", status: "Em Trânsito"},
    {id: 2, placa: 'JKL-8840', modelo: 'VW Delivery 11.180', motorista: 'Mariana Costa', status: 'Disponível'},
    {id: 3, placa: 'XYZ-4012', modelo: 'Mercedes Sprinter', motorista: 'Roberto Alves', status: 'Manutenção'}
];

let entregas = [
    {id: 101, veiculoId: 1, destino: 'São Paulo/SP', valor_carga: 48500.00, prazo: '2026-12-15'},
    {id: 102, veiculoId: 2, destino: 'Goiânia/GO', valor_carga: 12300.50, prazo: '2026-12-12'}
];

const formVeiculo = document.getElementById('form-veiculo');
const formEntrega = document.getElementById('form-entrega');
const listaVeiculos = document.getElementById('lista-veiculos');
const listaEntregas = document.getElementById('lista-entregas');
const selectVeiculoEntrega = document.getElementById("VeiculoId");
const inputBusca = document.getElementById("busca-veiculo");


formVeiculo.addEventListener("submit", cadastrarVeiculo);
formEntrega.addEventListener("submit", cadastrarEntrega);
inputBusca.addEventListener("input", renderizarVeiculos);

// Funções envolvendo veículos
function cadastrarVeiculo(event) {
    event.preventDefault();

    const novoVeiculo = {
        id: Date.now(),
        placa: document.getElementById("placa").value.trim().toUpperCase(),
        modelo: document.getElementById("modelo").value.trim(),
        motorista: document.getElementById("motorista").value.trim(),
        status: document.getElementById("status").value
    };

    veiculos.push(novoVeiculo);
    formVeiculo.reset();
    atualizarTela();
}

function alterarStatusVeiculo(id) {
    const ordemStatus = ["Disponível", "Em Trânsito", "Manutenção"];
    const veiculo = veiculos.find(v => v.id === id);

    if (veiculo) {
        const proximoIndice = (ordemStatus.indexOf(veiculo.status) + 1) % ordemStatus.length;
        veiculo.status = ordemStatus[proximoIndice];
        atualizarTela();
    }
}

function excluirVeiculo(id) {
    veiculos = veiculos.filter(v => v.id !== id);
    atualizarTela();
}

function renderizarVeiculos() {
    listaVeiculos.innerHTML = '';
    const termo = inputBusca.value.toLowerCase();

    const filtrados = veiculos.filter(v =>
        v.placa.toLowerCase().includes(termo) ||
        v.modelo.toLowerCase().includes(termo) ||
        v.motorista.toLowerCase().includes(termo)
    );

    filtrados.forEach(veiculo => {
        const card = document.createElement('article');
        card.classList.add('card');


    // Se o status for "Manutenção", o card ganha a classe .erro
    if (veiculo.status === 'Manutenção') {
        card.classList.add('erro');
    } else if (veiculo.status === 'Em Trânsito') {
        card.classList.add('em-transito');
    }

    card.innerHTML = `
        <div>
            <span class="badge-status">${veiculo.status}</span>
            <h3>${veiculo.placa} — ${veiculo.modelo}</h3>
            <p><strong>Motorista:</strong> ${veiculo.motorista}</p>
        </div>
        <div class="card-acoes">
            <button class="btn-mini btn-status" onclick="alterarStatusVeiculo(${veiculo.id})">Mudar Status</button>
            <button class="btn-mini btn-excluir" onclick="excluirVeiculo(${veiculo.id})">Excluir</button>
        </div>
        `;

    listaVeiculos.appendChild(card);
    });
}

// funções envolvendo entregas
function atualizarSelectVeiculos() {
    selectVeiculoEntrega.innerHTML = '<option value="">Selecione um veículo...</option>';

    veiculos.forEach(veiculo => {
        const option = document.createElement('option');
        option.value = veiculo.id;
        option.textContent = `${veiculo.placa} - ${veiculo.modelo} (${veiculo.status})`;
        selectVeiculoEntrega.appendChild(option);
    });
}

function cadastrarEntrega(event) {
    event.preventDefault();

    const novaEntrega = {
        id: Date.now(),
        veiculoId: Number(document.getElementById('veiculoId').value),
        destino: document.getElementById('destino').value.trim(),
        valor_carga: Number(document.getElementById('valor_carga').value),
        prazo: document.getElementById('prazo').value
    };

    entregas.push(novaEntrega);
    formEntrega.reset();
    atualizarTela();
}

function excluirEntrega(id) {
    entregas = entregas.filter(e => e.id !== id);
    atualizarTela();
}

function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarEntregas() {
    listaEntregas.innerHTML = '';

    entregas.forEach(entrega => {
        const veiculo = veiculos.find(v => v.id === entrega.veiculoId);
        const infoVeiculo = veiculo ? `${veiculo.placa} (${veiculo.motorista})` : 'Veículo não encontrado';

        const card = document.createElement('article');
        card.classList.add('card', 'card-entrega');


    // Rodapé usando Flexbox (.card-rodape) para alinhar destino e prazo
        card.innerHTML = `
        <div>
            <h3>Entrega #${entrega.id}</h3>
            <p><strong>Veículo (veiculoId):</strong> ${infoVeiculo}</p>
            <p><strong>Valor da Carga:</strong> ${formatarMoeda(entrega.valor_carga)}</p>
            <button class="btn-mini btn-excluir" style="margin-top: 8px;" onclick="excluirEntrega(${entrega.id})">Remover Entrega</button>
        </div>
        <div class="card-rodape">
            <span>Destino: ${entrega.destino}</span>
            <span>Prazo: ${formatarData(entrega.prazo)}</span>
        </div>
        `;

        listaEntregas.appendChild(card);
    });
}

// KPIs
function atualizarKPIs() {
    document.getElementById("kpi-total-veiculos").textContent = veiculos.length;
    document.getElementById("kpi-manutencao").textContent = veiculos.filter(v => v.status === "Manutenção").length;
    document.getElementById("kpi-total-entregas").textContent = entregas.length;
}

function atualizarTela() {
    renderizarVeiculos();
    renderizarEntregas();
    atualizarSelectVeiculos();
    atualizarKPIs();
}

atualizarTela();