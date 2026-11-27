# Projeto Integrador da Disciplina de Desenvolvimento de Interfaces
## Tema: Controle de Frota Logística
Aplicação web para cadastrar veículos, registrar entregas e acompanhar informações básicas da frota. O projeto foi desenvolvido como parte do Projeto Integrador da disciplina de Desenvolvimento de Interfaces.

## Desenvolvedores
- João Vitor Bernardes
- Pedro Henrique Silva da Cunha

## Stack Utilizada Permitida pelo Professor Gilberto Hiragi
- **HTML**: estrutura da página, formulários e áreas de conteúdo.
- **CSS**: layout, cores, cartões, formulários e responsividade.
- **JavaScript**: armazenamento em memória, interações e atualização da interface.

## Funcionalidades

### Veículos

- Cadastrar veículos com placa, modelo, motorista e status.
- Alterar o status: disponível → em trânsito → manutenção.
- Filtrar veículos por placa, modelo ou motorista.
- Excluir veículos.
- Exibir o total de veículos e a quantidade em manutenção.

### Entregas

- Registrar entregas associadas a um veículo.
- Informar destino, valor da carga e prazo.
- Exibir o veículo responsável, o destino, o valor e a data da entrega.
- Remover entregas.
- Exibir a quantidade total de entregas registradas.

## Estrutura do projeto

```text
.
├── index.html      # Estrutura da aplicação web
├── css/
│   └── style.css   # Estilização da página web
├── js/
│   └── app.js      # Dados e lógica da aplicação
└── README.md       # Documentação do projeto
```

## Organização do JavaScript

Os dados são armazenados nos arrays `veiculos` e `entregas`.

As principais funções são:

| Função | O que faz |
|---|---|
| `cadastrarVeiculo()` | Cria e adiciona um novo veículo |
| `alterarStatusVeiculo(id)` | Avança o status de um veículo |
| `excluirVeiculo(id)` | Remove um veículo pelo identificador |
| `renderizarVeiculos()` | Aplica o filtro e renderiza os cartões dos veículos |
| `atualizarSelectVeiculos()` | Atualiza os veículos disponíveis no formulário de entrega |
| `cadastrarEntrega()` | Cria e adiciona uma nova entrega |
| `excluirEntrega(id)` | Remove uma entrega pelo identificador |
| `renderizarEntregas()` | Renderiza os cartões das entregas |
| `atualizarKPIs()` | Atualiza os totais exibidos na página |
| `atualizarTela()` | Atualiza listas, opções e indicadores |

## Como executar

1. Faça o download ou clone do projeto.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` em um navegador.

Também é possível usar a extensão **Live Server** no VS Code para executar a página em um servidor local. Ou também a extensão **Live Preview** para visualização diretamente pela IDE.


Os dados são simulados e mantidos apenas enquanto a página permanece aberta. Ao atualizar ou fechar o navegador, os novos cadastros são perdidos porque o projeto não utiliza banco de dados ou armazenamento local.

## Apresentação em slides no link abaixo:


## Capturas de Tela da Aplicação: