import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "../componentes/formulariosCadastros/formularioCliente";
import FormularioCadastroProduto from "./formulariosCadastros/formularioProduto";
import FormularioCadastroServico from "./formulariosCadastros/formularioServico";
import ListaCliente from "../componentes/listas/listaCliente";
import ListaProduto from "../componentes/listas/listaProduto";
import ListaServico from "../componentes/listas/listaServico";
import RegistroCompras from "./compras/registroCompras";
import TopLista from "./topLista/topLista";

type ClienteDados = {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    dataCadastro: string;
    telefones: string[];
    produtosConsumidos: string[];
    servicosConsumidos: string[];
};

type Cliente = {
    nome: string;
    valorGasto: number;
    produtosConsumidos: string[];
    servicosConsumidos: string[];
}

type Props = {};

type State = {
    tela: string;
    opcoes: boolean;
    cadastro: string | null;
    clientes: ClienteDados[];
    topClientes: {
        clientesMaisGastaram: Cliente[];
        clientesMaisConsumiram: Cliente[];
        clientesMenosConsumiram: Cliente[];
        vendasGenero: Cliente[];
        vendasGerais: Cliente[];
    };
}

export default class Roteador extends Component<Props, State> {
    constructor(props: Props | Readonly<{}>) { //as propriedades recebidas pelo componente são somente leitura, não devem ser modificadas
        super(props)
        this.state = {
            tela: 'Clientes',
            opcoes: false,
            cadastro: null,
            clientes: [],
            topClientes: {
                clientesMaisGastaram: [],
                clientesMaisConsumiram: [],
                clientesMenosConsumiram: [],
                vendasGenero: [],
                vendasGerais: [],
            },
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.toggleCadastros = this.toggleCadastros.bind(this);
        this.selecionarCadastro = this.selecionarCadastro.bind(this);
        this.atualizarClientes = this.atualizarClientes.bind(this);
        this.voltar = this.voltar.bind(this);
    }

    // método para selecionar a view com base na tela clicada
    selecionarView(novaTela: string, evento?: React.MouseEvent<HTMLAnchorElement>) {
        if (evento) {
            evento.preventDefault();
        }
        if (this.state.tela !== novaTela) {
            this.setState({
                tela: novaTela,
                opcoes: false,
                cadastro: null,
            });
        }
    }

    // método para alternar a visibilidade das opções de cadastro
    toggleCadastros(evento: React.MouseEvent<HTMLButtonElement>) {
        evento.preventDefault()
        this.setState((prevState) => ({
            opcoes: !prevState.opcoes
        }))
    }

    selecionarCadastro(novoCadastro: string, evento?: React.MouseEvent<HTMLButtonElement>) {
        if (evento) {
            evento.preventDefault();
        }
        if (this.state.cadastro !== novoCadastro) {
            this.setState({
                cadastro: novoCadastro,
            });
        }
    }

    atualizarClientes(clientes: ClienteDados[]) {
        // atualizar os clientes e recalcular os rankings
        const topClientes = this.calcularTopClientes(clientes);
        this.setState({ clientes, topClientes });
    }

    calcularTopClientes(clientes: ClienteDados[]) {
        const clientesMaisGastaram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: this.calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => b.valorGasto - a.valorGasto)
            .slice(0, 5);

        const clientesMaisConsumiram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: this.calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (b.produtosConsumidos.length + b.servicosConsumidos.length) - (a.produtosConsumidos.length + a.servicosConsumidos.length))
            .slice(0, 5);

        const clientesMenosConsumiram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: this.calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);

        const vendasGenero = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: this.calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);
        
        
        const vendasGerais = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: this.calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);
        
        return { clientesMaisGastaram, clientesMaisConsumiram, clientesMenosConsumiram, vendasGenero, vendasGerais };
    }

    calcularValorGasto(cliente: ClienteDados) {
        // suponha que o valor de cada produto ou serviço seja 100 para simplificação
        const valorProduto = 100;
        const valorServico = 100;
        return (cliente.produtosConsumidos.length * valorProduto) + (cliente.servicosConsumidos.length * valorServico);
    }

    voltar() {
        this.setState({ tela: 'Clientes' });
    }

    render() {
        const { tela, clientes, topClientes } = this.state;
        // barra de navegação com os botões clientes e cadastros
        let barraNavegacao = (
            <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-4" 
            botoes={['Cadastrar Cliente', 'Cadastrar Produto', 'Cadastrar Serviço', 'Clientes', 'Produtos', 'Serviços', 'Compras', 'Top Clientes']} 
            />
        );
        let tema = "purple lighten-4";

        return (
            <>
                {barraNavegacao}
                {tela === 'Clientes' && <ListaCliente tema={tema} />}
                {tela === 'Produtos' && <ListaProduto tema={tema} />}
                {tela === 'Serviços' && <ListaServico tema={tema} />}
                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema={tema} />}
                {tela === 'Cadastrar Produto' && <FormularioCadastroProduto tema={tema} />}
                {tela === 'Cadastrar Serviço' && <FormularioCadastroServico tema={tema} />}
                {tela === 'Compras' && (
                    <RegistroCompras
                        tema={tema}
                        clientes={clientes}
                        atualizarClientes={this.atualizarClientes}
                        voltar={this.voltar}
                    />
                )}
                {tela === 'Top Clientes' && <TopLista tema={tema} lista={topClientes} />}
            </>
        );

    }
}
