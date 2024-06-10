/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';
import RegistroCompras from "../compras/registroCompras";

type props = {
    tema: string
}

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
};

type State = {
    clienteSelecionado: Cliente | null;
    editando: boolean;
    clienteEditado: Cliente | null;
    mostrarRegistroConsumo: boolean;
    clientes: Cliente[];
};

export default class ListaCliente extends Component<props, State> {
    state: State = {
        clienteSelecionado: null,
        editando: false,
        clienteEditado: null,
        mostrarRegistroConsumo: false,
        clientes: [
            {
                nome: "Maria Luiza Guedes da Silva",
                nomeSocial: "Maria",
                genero: "Feminino",
                cpf: "123.456.789-00",
                rgs: ["12.345.678-9"],
                dataCadastro: "01/01/2020",
                telefones: ["(12) 98765-4321"],
                produtosConsumidos: ["Produto A", "Produto B"],
                servicosConsumidos: ["Serviço X", "Serviço Y"]
            },
            {
                nome: "Mateus Vieira Silva Pereira",
                nomeSocial: "Mateus",
                genero: "Masculino",
                cpf: "987.654.321-00",
                rgs: ["98.765.432-1"],
                dataCadastro: "02/04/2022",
                telefones: ["(11) 87654-3210"],
                produtosConsumidos: ["Produto C", "Produto D"],
                servicosConsumidos: ["Serviço Z"]
            },
            {
                nome: "Giovanna Carvalho Xavier",
                nomeSocial: "Giovanna",
                genero: "Feminino",
                cpf: "111.222.333-44",
                rgs: ["11.222.333-4"],
                dataCadastro: "01/01/2020",
                telefones: ["(12) 98765-4321"],
                produtosConsumidos: ["Produto E", "Produto F"],
                servicosConsumidos: ["Serviço A", "Serviço B"]
            },
            {
                nome: "Junior Daniel da Silva",
                nomeSocial: "Junior",
                genero: "Masculino",
                cpf: "555.666.777-88",
                rgs: ["55.666.777-8"],
                dataCadastro: "04/04/2024",
                telefones: ["(21) 87654-3210"],
                produtosConsumidos: ["Produto G", "Produto H"],
                servicosConsumidos: ["Serviço C"]
            },
            {
                nome: "Jessica Ariany Freire",
                nomeSocial: "Jessica",
                genero: "Feminino",
                cpf: "999.888.777-66",
                rgs: ["99.888.777-6"],
                dataCadastro: "05/05/2017",
                telefones: ["(51) 98765-4321"],
                produtosConsumidos: ["Produto I", "Produto J"],
                servicosConsumidos: ["Serviço D", "Serviço E"]
            },
            {
                nome: "William Ferreira Azevedo",
                nomeSocial: "William",
                genero: "Masculino",
                cpf: "222.333.444-55",
                rgs: ["22.333.444-5"],
                dataCadastro: "06/06/2016",
                telefones: ["(61) 87654-3210"],
                produtosConsumidos: ["Produto K", "Produto L"],
                servicosConsumidos: ["Serviço F"]
            },
            {
                nome: "Sofia Matos Lessa",
                nomeSocial: "Sofia",
                genero: "Feminino",
                cpf: "333.444.555-66",
                rgs: ["33.444.555-6"],
                dataCadastro: "07/07/2015",
                telefones: ["(71) 98765-4321"],
                produtosConsumidos: ["Produto M", "Produto N"],
                servicosConsumidos: ["Serviço G", "Serviço H"]
            },
            {
                nome: "Felipe Henrique Castro",
                nomeSocial: "Felipe Castro",
                genero: "Masculino",
                cpf: "444.555.666-77",
                rgs: ["44.555.666-7"],
                dataCadastro: "08/08/2014",
                telefones: ["(81) 87654-3210"],
                produtosConsumidos: ["Produto O", "Produto P"],
                servicosConsumidos: ["Serviço I"]
            },
            {
                nome: "Mariana Gomes Barros",
                nomeSocial: "Mariana Barros",
                genero: "Feminino",
                cpf: "555.666.777-88",
                rgs: ["55.666.777-8"],
                dataCadastro: "09/09/2013",
                telefones: ["(91) 98765-4321"],
                produtosConsumidos: ["Produto Q", "Produto R"],
                servicosConsumidos: ["Serviço J", "Serviço K"]
            },
            {
                nome: "Rafael Alves Pinto",
                nomeSocial: "Rafael Pinto",
                genero: "Masculino",
                cpf: "666.777.888-99",
                rgs: ["66.777.888-9"],
                dataCadastro: "10/10/2012",
                telefones: ["(11) 87654-3210"],
                produtosConsumidos: ["Produto S", "Produto T"],
                servicosConsumidos: ["Serviço L"]
            },
        ]
    };

    clienteSelecionado = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente, editando: false, clienteEditado: cliente });
    };

    fechar = () => {
        this.setState({ clienteSelecionado: null });
    };

    editar = () => {
        this.setState({ editando: true });
    };

    excluir = () => {
        const { clienteSelecionado } = this.state;
        if (clienteSelecionado) {
            const novoArrayClientes = this.state.clientes.filter(cliente => cliente.cpf !== clienteSelecionado.cpf);
            this.setState({ clientes: novoArrayClientes, clienteSelecionado: null });
        }
    };

    salvar = () => {
        const { clienteSelecionado, clienteEditado } = this.state;
        if (clienteSelecionado && clienteEditado) {
            const index = this.state.clientes.findIndex(cliente => cliente.cpf === clienteSelecionado.cpf);
            if (index !== -1) {
                const novosClientes = [...this.state.clientes];
                novosClientes[index] = clienteEditado;
                this.setState({ clientes: novosClientes, clienteSelecionado: clienteEditado, editando: false });
            }
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            clienteEditado: {
                ...prevState.clienteEditado!,
                [name]: value
            }
        }));
    };

    mostrarRegistroConsumo = () => {
        this.setState({ mostrarRegistroConsumo: true });
    };

    voltar = () => {
        this.setState({ mostrarRegistroConsumo: false });
    };

    atualizarClientes = (clientes: Cliente[]) => {
        this.setState({ clientes });
    };

    render() {
        const { clienteSelecionado, editando, clienteEditado, mostrarRegistroConsumo, clientes } = this.state;
        let estilo = `collection-item active ${this.props.tema}`;

        return (
            <div>
                {!mostrarRegistroConsumo ? (
                    <div>
                        <h3 className="page-title"> World Beauty </h3>
                        <div>
                            <h4 className="component-title">Clientes</h4>
                            <div className="left">
                                <div className="collection">
                                    {clientes.map((cliente) => (
                                        <a
                                            key={cliente.nome}
                                            className="collection-item"
                                            onClick={() => this.clienteSelecionado(cliente)}
                                        >
                                            {cliente.nome}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="table.responsive-table">
                                {clienteSelecionado && !editando && (
                                    <div className={estilo}>
                                        <h3>{clienteSelecionado.nome}</h3>
                                        <p><strong>Nome Social:</strong> {clienteSelecionado.nomeSocial}</p>
                                        <p><strong>Sexo:</strong> {clienteSelecionado.genero}</p>
                                        <p><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
                                        <p><strong>RG(s):</strong> {clienteSelecionado.rgs.join(", ")}</p>
                                        <p><strong>Data de Cadastro:</strong> {clienteSelecionado.dataCadastro}</p>
                                        <p><strong>Telefone(s):</strong> {clienteSelecionado.telefones.join(", ")}</p>
                                        <p><strong>Produtos Consumidos:</strong> {clienteSelecionado.produtosConsumidos.join(", ")}</p>
                                        <p><strong>Serviços Consumidos:</strong> {clienteSelecionado.servicosConsumidos.join(", ")}</p>
                                        <button onClick={this.fechar} className="btn">Fechar</button>
                                        <button onClick={this.editar} className="btn">Editar</button>
                                        <button onClick={this.excluir} className="btn red">Excluir Cliente</button>
                                        <button onClick={this.mostrarRegistroConsumo} className="btn">Registrar Consumo</button>
                                    </div>
                                )}

                                {clienteSelecionado && editando && (
                                    <div className={estilo}>
                                        <h3>Editar Cliente</h3>
                                        <div className="input-field">
                                            <input type="text" name="nome" value={clienteEditado!.nome} onChange={this.handleChange} />
                                            <label className="active">Nome</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" name="nomeSocial" value={clienteEditado!.nomeSocial} onChange={this.handleChange} />
                                            <label className="active">Nome Social</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" name="genero" value={clienteEditado!.genero} onChange={this.handleChange} />
                                            <label className="active">Sexo</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" name="cpf" value={clienteEditado!.cpf} onChange={this.handleChange} />
                                            <label className="active">CPF</label>
                                        </div>
                                        <div className="input-field">
                                            <textarea name="rgs" className="materialize-textarea" value={clienteEditado!.rgs.join(", ")} onChange={this.handleChange}></textarea>
                                            <label className="active">RG(s)</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" name="dataCadastro" value={clienteEditado!.dataCadastro} onChange={this.handleChange} />
                                            <label className="active">Data de Cadastro</label>
                                        </div>
                                        <div className="input-field">
                                            <textarea name="telefones" className="materialize-textarea" value={clienteEditado!.telefones.join(", ")} onChange={this.handleChange}></textarea>
                                            <label className="active">Telefone(s)</label>
                                        </div>
                                        <div className="input-field">
                                            <textarea name="produtosConsumidos" className="materialize-textarea" value={clienteEditado!.produtosConsumidos.join(", ")} onChange={this.handleChange}></textarea>
                                            <label className="active">Produtos Consumidos</label>
                                        </div>
                                        <div className="input-field">
                                            <textarea name="servicosConsumidos" className="materialize-textarea" value={clienteEditado!.servicosConsumidos.join(", ")} onChange={this.handleChange}></textarea>
                                            <label className="active">Serviços Consumidos</label>
                                        </div>
                                        <button onClick={this.salvar} className="btn">Salvar</button>
                                        <button onClick={this.fechar} className="btn">Fechar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <RegistroCompras
                        tema={this.props.tema}
                        clientes={clientes}
                        atualizarClientes={this.atualizarClientes}
                        voltar={this.voltar}
                    />
                )}
            </div>
        );
    }
}