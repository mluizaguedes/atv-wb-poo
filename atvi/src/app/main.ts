import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
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
import RG from "../modelo/rg";
import CPF from "../modelo/cpf";
import Telefone from "../modelo/telefone";

console.log(`Bem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa()

let clientes = [
new Cliente("Maria Silva", "Maria", "F", new CPF('111.111.111-11', '22, 8, 2022'), [new RG('11.111.111-1', '22, 8, 2020', 'SP')], new Date().toISOString(), [new Telefone('11', '1111-1111')]),
new Cliente("Cesár Reis", "César", "M", new CPF('121.212.221-21', '22, 2, 2022'), [new RG('21.121.121-2', '12, 8, 2017', 'SP')], new Date().toISOString(), [new Telefone('12', '1212-2121')]),
new Cliente("Jessica Freire", "Jessica", "F", new CPF('123.456.789-10', '13, 11, 1989'), [new RG('12.345.678-9', '15, 5, 2007', 'CA')], new Date().toISOString(), [new Telefone('12', '1234-5678')]),
new Cliente("João Guilherme", "João", "M", new CPF('222.222.222-22', '15, 3, 1995'), [new RG('22.222.222-2', '10, 6, 2010', 'RJ')], new Date().toISOString(), [new Telefone('21', '2222-2222')]),
new Cliente("Ana Clara", "Clara", "F", new CPF('333.333.333-33', '25, 5, 1990'), [new RG('33.333.333-3', '18, 2, 2011', 'MG')], new Date().toISOString(), [new Telefone('31', '3333-3333')]),
new Cliente("Lucas Vieira", "Lucas", "M", new CPF('444.444.444-44', '30, 7, 1985'), [new RG('44.444.444-4', '22, 3, 2012', 'SP')], new Date().toISOString(), [new Telefone('11', '4444-4444')]),
new Cliente("Julia Leão", "Julia", "F", new CPF('555.555.555-55', '10, 11, 2000'), [new RG('55.555.555-5', '7, 7, 2015', 'BA')], new Date().toISOString(), [new Telefone('71', '5555-5555')]),
new Cliente("Gustavo Amancio", "Gustavo", "M", new CPF('666.666.666-66', '5, 1, 1998'), [new RG('66.666.666-6', '15, 5, 2016', 'PE')], new Date().toISOString(), [new Telefone('81', '6666-6666')]),
new Cliente("Camila Oliveira", "Camila", "F", new CPF('777.777.777-77', '18, 9, 1992'), [new RG('77.777.777-7', '12, 1, 2018', 'RS')], new Date().toISOString(), [new Telefone('51', '7777-7777')]),
new Cliente("Pedro Almeida", "Pedro", "M", new CPF('888.888.888-88', '25, 4, 1987'), [new RG('88.888.888-8', '20, 6, 2014', 'PR')], new Date().toISOString(), [new Telefone('41', '8888-8888')]),
new Cliente("Juliana Araújo", "Juliana", "F", new CPF('999.999.999-99', '15, 3, 2002'), [new RG('99.999.999-9', '25, 9, 2019', 'CE')], new Date().toISOString(), [new Telefone('85', '9999-9999')]),
new Cliente("Rafael Barbosa", "Rafael", "M", new CPF('123.123.123-12', '21, 7, 1993'), [new RG('12.312.312-3', '8, 11, 2013', 'MA')], new Date().toISOString(), [new Telefone('98', '1234-5678')]),
new Cliente("Larissa Martins", "Larissa", "F", new CPF('234.234.234-23', '31, 12, 1991'), [new RG('23.423.423-4', '9, 4, 2012', 'GO')], new Date().toISOString(), [new Telefone('62', '2345-6789')]),
new Cliente("Bruno Costa", "Bruno", "M", new CPF('345.345.345-34', '13, 6, 1988'), [new RG('34.534.534-5', '11, 3, 2011', 'MS')], new Date().toISOString(), [new Telefone('67', '3456-7890')]),
new Cliente("Aline Ferreira", "Aline", "F", new CPF('456.456.456-45', '29, 8, 1985'), [new RG('45.645.645-6', '14, 5, 2014', 'PA')], new Date().toISOString(), [new Telefone('91', '4567-8901')]),
new Cliente("Renato Souza", "Renato", "M", new CPF('567.567.567-56', '24, 11, 1994'), [new RG('56.756.756-7', '30, 8, 2017', 'PB')], new Date().toISOString(), [new Telefone('83', '5678-9012')]),
new Cliente("Fernanda Lima", "Fernanda", "F", new CPF('678.678.678-67', '19, 2, 2001'), [new RG('67.867.867-8', '19, 7, 2019', 'PI')], new Date().toISOString(), [new Telefone('86', '6789-0123')]),
new Cliente("Rodrigo Mendes", "Rodrigo", "M", new CPF('789.789.789-78', '15, 5, 1996'), [new RG('78.978.978-9', '25, 2, 2018', 'RN')], new Date().toISOString(), [new Telefone('84', '7890-1234')]),
new Cliente("Patricia Carvalho", "Patricia", "F", new CPF('890.890.890-89', '22, 10, 1989'), [new RG('89.089.089-0', '10, 10, 2010', 'RO')], new Date().toISOString(), [new Telefone('69', '8901-2345')]),
new Cliente("Thiago Gomes", "Thiago", "M", new CPF('901.901.901-90', '5, 3, 1997'), [new RG('90.190.190-1', '3, 12, 2015', 'RR')], new Date().toISOString(), [new Telefone('95', '9012-3456')]),
new Cliente("Amanda Almeida", "Amanda", "F", new CPF('012.012.012-01', '25, 1, 2014'), [new RG('01.201.201-2', '5, 1, 2010', 'PR')], new Date().toISOString(), [new Telefone('79', '0123-4567')]),
new Cliente("Ricardo Souza", "Ricardo", "M", new CPF('123.321.123-32', '17, 6, 1992'), [new RG('23.321.321-3', '14, 8, 2012', 'TO')], new Date().toISOString(), [new Telefone('63', '3210-9876')]),
new Cliente("Juliana Freitas", "Juliana", "F", new CPF('234.432.234-43', '12, 4, 1984'), [new RG('34.432.432-4', '10, 4, 2005', 'AC')], new Date().toISOString(), [new Telefone('68', '4321-0987')]),
new Cliente("William Azevedo", "William", "M", new CPF('345.543.345-54', '6, 2, 2014'), [new RG('45.543.543-5', '20, 9, 2014', 'PR')], new Date().toISOString(), [new Telefone('96', '5432-1098')]),
new Cliente("Carolina Dias", "Carolina", "F", new CPF('456.654.456-65', '9, 7, 1998'), [new RG('56.654.654-6', '19, 3, 2016', 'AM')], new Date().toISOString(), [new Telefone('92', '6543-2109')]),
new Cliente("Marcelo Nunes", "Marcelo", "M", new CPF('567.765.567-76', '30, 11, 1981'), [new RG('67.765.765-7', '21, 6, 2001', 'ES')], new Date().toISOString(), [new Telefone('27', '7654-3210')]),
new Cliente("Isabela Ramos", "Isabela", "F", new CPF('678.876.678-87', '14, 5, 1993'), [new RG('78.876.876-8', '18, 2, 2013', 'MT')], new Date().toISOString(), [new Telefone('65', '8765-4321')]),
new Cliente("Eduardo Pereira", "Eduardo", "M", new CPF('789.987.789-98', '25, 3, 2000'), [new RG('89.987.987-9', '13, 4, 2018', 'SC')], new Date().toISOString(), [new Telefone('48', '9876-5432')]),
new Cliente("Renata Silva", "Renata", "F", new CPF('890.098.890-09', '23, 8, 1996'), [new RG('90.098.098-0', '29, 9, 2017', 'AL')], new Date().toISOString(), [new Telefone('82', '0987-6543')]),
new Cliente("Rodrigo Martins", "Rodrigo", "M", new CPF('901.109.901-01', '11, 12, 1994'), [new RG('01.109.109-1', '25, 11, 2015', 'DF')], new Date().toISOString(), [new Telefone('61', '1098-7654')])
];

let produtos = [
new Produto("Shampoo Profissional Hidratante", 50),
new Produto("Condicionador Hidratante", 45),
new Produto("Máscara de Tratamento Capilar", 70),
new Produto("Tinta para Cabelos", 60),
new Produto("Pasta Modeladora para Barba e Bigode", 40),
new Produto("Spray Fixador para Cabelo", 35),
new Produto("Gel Fixador para Cabelo", 35),
new Produto("Creme de Barbear", 30),
new Produto("Loção Pós-Barba", 25),
new Produto("Pente de Madeira", 20),
new Produto("Escova Alisadora", 150),
new Produto("Spray de Fixação", 40),
new Produto("Shampoo 3 em 1", 35),
new Produto("Tônico Capilar Antiqueda", 55),
new Produto("Pomada Modeladora", 45),
new Produto("Balm para Barba", 35),
new Produto("Espuma de Barbear", 25),
new Produto("Shampoo para Barba", 35),
new Produto("Condicionador para Barba", 30),
new Produto("Kit de Pentes para Corte", 50),
new Produto("Creme para Pentear", 40),
new Produto("Máscara de Hidratação Profunda", 80),
new Produto("Serum Reparador de Pontas", 55),
new Produto("Protetor Térmico Capilar", 45),
new Produto("Toalhas Quentes Descartáveis", 20),
new Produto("Esfoliante Facial para Homens", 30),
new Produto("Lâminas de Barbear Descartáveis", 15),
new Produto("Capa de Corte de Cabelo", 35),
new Produto("Tesoura de Desbaste", 120),
new Produto("Kit de Aparador de Pelos", 200)
];

let servicos = [
new Servico("Manicure", 30),
new Servico("Pedicure", 35),
new Servico("Design de sobrancelhas", 25),
new Servico("Pintura de cabelo", 200),
new Servico("Remoção de rugas", 150),
new Servico("Remoção de manchas na pele", 200),
new Servico("Aplicação de Botox", 500),
new Servico("Tratamento para emagrecimento", 300),
new Servico("Redução de medidas", 350),
new Servico("Corte de cabelo masculino", 80),
new Servico("Modelagem e corte de barba", 50),
new Servico("Tratamento para quedas de cabelo", 250),
new Servico("Massagem relaxante", 120),
new Servico("Limpeza de pele", 90),
new Servico("Hidratação capilar", 70),
new Servico("Depilação a laser", 400),
new Servico("Maquiagem para eventos", 150),
new Servico("Escova progressiva", 180),
new Servico("Tratamento de unhas encravadas", 60),
new Servico("Peeling facial", 220),
];

clientes.forEach(cliente => empresa.getClientes.push(cliente));
produtos.forEach(produto => empresa.getProdutos.push(produto));
servicos.forEach(servico => empresa.getServicos.push(servico));

// Adicionando produtos e serviços para clientes selecionados
clientes[0].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[2]);
clientes[1].getProdutosConsumidos.push(produtos[1], produtos[3], produtos[4]);
clientes[2].getProdutosConsumidos.push(produtos[1], produtos[2], produtos[4]);
clientes[3].getProdutosConsumidos.push(produtos[1], produtos[2], produtos[3]);
clientes[4].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[4]);

clientes[5].getServicosConsumidos.push(servicos[1], servicos[1], servicos[2]);
clientes[6].getServicosConsumidos.push(servicos[0], servicos[3], servicos[4]);
clientes[7].getServicosConsumidos.push(servicos[1], servicos[2], servicos[4]);
clientes[8].getServicosConsumidos.push(servicos[0], servicos[2], servicos[3]);
clientes[9].getServicosConsumidos.push(servicos[1], servicos[1], servicos[4]);

clientes[10].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[2]);
clientes[11].getProdutosConsumidos.push(produtos[1], produtos[3], produtos[4]);
clientes[12].getProdutosConsumidos.push(produtos[0], produtos[2], produtos[4]);
clientes[13].getProdutosConsumidos.push(produtos[1], produtos[2], produtos[3]);
clientes[14].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[4]);

clientes[15].getServicosConsumidos.push(servicos[1], servicos[1], servicos[2]);
clientes[16].getServicosConsumidos.push(servicos[0], servicos[3], servicos[4]);
clientes[17].getServicosConsumidos.push(servicos[19], servicos[2], servicos[4]);
clientes[18].getServicosConsumidos.push(servicos[1], servicos[2], servicos[3]);
clientes[19].getServicosConsumidos.push(servicos[19], servicos[1], servicos[4]);

clientes[20].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[2]);
clientes[21].getProdutosConsumidos.push(produtos[1], produtos[3], produtos[4]);
clientes[22].getProdutosConsumidos.push(produtos[0], produtos[2], produtos[4]);
clientes[23].getProdutosConsumidos.push(produtos[1], produtos[2], produtos[3]);
clientes[24].getProdutosConsumidos.push(produtos[0], produtos[1], produtos[4]);

clientes[25].getServicosConsumidos.push(servicos[19], servicos[1], servicos[2]);
clientes[26].getServicosConsumidos.push(servicos[6], servicos[3], servicos[4]);
clientes[27].getServicosConsumidos.push(servicos[19], servicos[2], servicos[4]);
clientes[28].getServicosConsumidos.push(servicos[0], servicos[2], servicos[3]);
clientes[29].getServicosConsumidos.push(servicos[19], servicos[1], servicos[4]);

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