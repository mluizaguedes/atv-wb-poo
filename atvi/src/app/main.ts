import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"
import CadastroCliente from "../negocio/cadastros/cadastroCliente";
import CadastroProduto from "../negocio/cadastros/cadastroProduto";
import CadastroServiço from "../negocio/cadastros/cadastroServiço";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProdutos from "../negocio/listagemProdutos";
import ListagemServiços from "../negocio/listagemServiços";
import UpdateClientes from "../negocio/updates/updateClientes";
import UpdateProdutos from "../negocio/updates/updateProdutos";
import UpdateServiços from "../negocio/updates/updateServiços";
import DeleteCliente from "../negocio/delete/deleteClientes";
import DeleteProduto from "../negocio/delete/deleteProdutos";
import DeleteServiço from "../negocio/delete/deleteServiços";
import ConsumoProduto from "../negocio/consumo/consumoProdutos";
import ConsumoServiço from "../negocio/consumo/consumoServiços";
import Classificar10ClientesMaisConsumiram from "../negocio/10ClientesMaisConsumiram";
import ClassificarVendasGerais from "../negocio/classificarVendasGerais";
import ClassificarVendasGenero from "../negocio/classificarVendasGenero";
import Classificar10ClientesMenosConsumiram from "../negocio/10ClientesMenosConsumiram";
import Classificar5ClientesMaisGastaram from "../negocio/5ClientesMaisGastaram";

console.log(`Bem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Cadastrar produto`);
    console.log(`3 - Cadastrar serviço`);
    console.log(`----------------------------`);
    console.log(`4 - Listar todos os clientes`);
    console.log(`5 - Listar todos os produtos`);
    console.log(`6 - Listar todos os serviços`);
    console.log(`----------------------------`);
    console.log(`7 - Atualizar cadastro de cliente`);
    console.log(`8 - Atualizar cadastro de produto`);
    console.log(`9 - Atualizar cadastro de serviço`);
    console.log(`----------------------------`);
    console.log(`10 - Registrar compra de produto`);
    console.log(`11 - Registrar serviço adquirido`);
    console.log(`----------------------------`);
    console.log(`12 - Deletar cliente`);
    console.log(`13 - Deletar produto`);
    console.log(`14 - Deletar serviço`);
    console.log(`----------------------------`);
    console.log(`15 - Listar produtos e serviços mais consumidos`);
    console.log(`16 - Listar produtos e serviços mais consumidos de cada gênero`);
    console.log(`17 - Os dez clientes que MAIS consumiram produtos ou serviços`);
    console.log(`18 - Os dez clientes que MENOS consumiram produtos ou serviços`);
    console.log(`19 - Os cinco clientes que MAIS consumiram em valor:`);
    console.log(`----------------------------`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;
        case 3:
            let cadastroServiço = new CadastroServiço(empresa.getServicos)
            cadastroServiço.cadastrar()
            break;

        case 4:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 5:
            let listagemProdutos = new ListagemProdutos(empresa.getProdutos)
            listagemProdutos.listar()
            break;
        case 6:
            let listagemServiços = new ListagemServiços(empresa.getServicos)
            listagemServiços.listar()
            break;

        case 7:
            let updateClientes = new UpdateClientes(empresa.getClientes)
            updateClientes.atualizar()
            break;
        case 8:
            let updateProdutos = new UpdateProdutos(empresa.getProdutos)
            updateProdutos.atualizar()
            break;
        case 9:
            let updateServiços = new UpdateServiços(empresa.getServicos)
            updateServiços.atualizar()
            break;
        case 10:
            let consumoProdutos = new ConsumoProduto (empresa.getClientes, empresa.getProdutos)
            consumoProdutos.registrar()
            break;
        case 11:
            let consumoServiços = new ConsumoServiço (empresa.getClientes, empresa.getServicos)
            consumoServiços.registrar()
            break;
        case 12:
            let deleteClientes = new DeleteCliente (empresa.getClientes)
            deleteClientes.deletar()
            break;
        case 13:
            let deleteProdutos = new DeleteProduto (empresa.getProdutos)
            deleteProdutos.deletar()
            break;
        case 14:
            let deleteServiços = new DeleteServiço (empresa.getServicos)
            deleteServiços.deletar()
            break;
        case 15:
            let classificarVendasGerais = new ClassificarVendasGerais(empresa.getClientes)
            classificarVendasGerais.classificar()
            break;
        case 16:
            let classificarVendasGenero = new ClassificarVendasGenero(empresa.getClientes)
            classificarVendasGenero.classificar()
            break;
        case 17:
            let classificar10ClientesMaisConsumiram = new Classificar10ClientesMaisConsumiram (empresa.getClientes)
            classificar10ClientesMaisConsumiram.classificar()
            break;
        case 18:
            let classificar10ClientesMenosConsumiram = new Classificar10ClientesMenosConsumiram (empresa.getClientes)
            classificar10ClientesMenosConsumiram.classificar()
            break;
        case 19:
            let classificar5ClientesMaisGastaram = new Classificar5ClientesMaisGastaram (empresa.getClientes)
            classificar5ClientesMaisGastaram.classificar()
            break;
            
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}