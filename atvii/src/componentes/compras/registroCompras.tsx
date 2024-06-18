/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';

type Cliente = {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    dataCadastro: string;
    telefones: string[];
    produtosConsumidos: string[];
    servicosConsumidos: string[];
}

type props = {
    tema: string;
    clientes: Cliente[];
    atualizarClientes: (clientes: Cliente[]) => void;
    voltar: () => void;
};

type State = {
    clienteSelecionado: Cliente | null;
    novaCompra: {
        tipo: string;
        nome: string;
    };
    cpfInput: string;
};

export default class RegistroCompras extends Component<props, State> {
    constructor(props: props) {
        super(props);
        this.state = {
            clienteSelecionado: null,
            novaCompra: {
                tipo: '',
                nome: '',
            },
            cpfInput: '',
        };
    }

    handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            cpfInput: event.target.value,
            clienteSelecionado: null,
        });
    };

    handleCompraChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            novaCompra: {
                ...prevState.novaCompra,
                [name]: value
            }
        }));
    };

    adicionarCompra = () => {
        const { clienteSelecionado, novaCompra } = this.state;
        const { clientes, atualizarClientes } = this.props;
        if (clienteSelecionado && novaCompra.nome && novaCompra.tipo) {
            if (novaCompra.tipo === "Produto") {
                clienteSelecionado.produtosConsumidos.push(novaCompra.nome);
            } else if (novaCompra.tipo === "Serviço") {
                clienteSelecionado.servicosConsumidos.push(novaCompra.nome);
            }
            const novoArrayClientes = clientes.map(cliente =>
                cliente.cpf === clienteSelecionado.cpf ? clienteSelecionado : cliente
            );
            atualizarClientes(novoArrayClientes);
            this.props.voltar();
        }
    };

    handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const clienteSelecionado = this.props.clientes.find(cliente => cliente.cpf === value) || null;
        this.setState({ clienteSelecionado });
    };

    handleBuscarCliente = () => {
        const { clientes } = this.props;
        const { cpfInput } = this.state;
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === cpfInput) || null;
        this.setState({ clienteSelecionado });
    };

    render() {
        const { tema, clientes } = this.props;
        const { novaCompra, clienteSelecionado, cpfInput } = this.state;
        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div className="selecionado">
                    <h4>Registrar Compras</h4>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="CPF do Cliente"
                            value={cpfInput}
                            onChange={this.handleCPFChange}
                        />
                        <button onClick={this.handleBuscarCliente} className="btn">Buscar Cliente</button>
                    </div>
                    {clienteSelecionado && (
                        <>
                            <div className="input-field">
                                <label>Cliente: {clienteSelecionado.nome}</label>
                            </div>
                            <div className="input-field">
                                <input type="text" name="tipo" value={novaCompra.tipo} onChange={this.handleCompraChange} />
                                <label className="active">Tipo (Produto/Serviço)</label>
                            </div>
                            <div className="input-field">
                                <input type="text" name="nome" value={novaCompra.nome} onChange={this.handleCompraChange} />
                                <label className="active">Nome</label>
                            </div>
                            <button onClick={this.adicionarCompra} className="btn">Adicionar Compra</button>
                        </>
                    )}
                    <button onClick={this.props.voltar} className="btn">Voltar</button>
                </div>
            </div>
        );
    }
}