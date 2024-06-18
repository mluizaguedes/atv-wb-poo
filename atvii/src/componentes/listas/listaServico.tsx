/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    tema: string
}

type Servico = {
    id: number;
    nome: string;
    valor: string;
};

type State = {
    servicoSelecionado: Servico | null;
    editando: boolean;
    servicoEditado: Servico | null;
};

export default class ListaServico extends Component<props, State> {
    state: State = {
        servicoSelecionado: null,
        editando: false,
        servicoEditado: null
    };

    servicos: Servico[] = [
        { id: 1, nome: "Manicure", valor: "R$ 30,00" },
        { id: 2, nome: "Pedicure", valor: "R$ 35,00" },
        { id: 3, nome: "Design de sobrancelhas", valor: "R$ 25,00" },
        { id: 4, nome: "Corte de cabelo feminino", valor: "R$ 120,00" },
        { id: 5, nome: "Pintura de cabelo", valor: "R$ 200,00" },
        { id: 6, nome: "Remoção de rugas", valor: "R$ 150,00" },
        { id: 7, nome: "Remoção de manchas na pele", valor: "R$ 200,00" },
        { id: 8, nome: "Aplicação de Botox", valor: "R$ 500,00" },
        { id: 9, nome: "Tratamento para emagrecimento", valor: "R$ 300,00" },
        { id: 10, nome: "Redução de medidas", valor: "R$ 350,00" },
        { id: 11, nome: "Corte de cabelo masculino", valor: "R$ 80,00" },
        { id: 12, nome: "Modelagem e corte de barba", valor: "R$ 50,00" },
        { id: 13, nome: "Tratamento para quedas de cabelo", valor: "R$ 250,00" },
    ];

    servicoSelecionado = (servico: Servico) => {
        this.setState({ servicoSelecionado: servico, editando: false, servicoEditado: servico });
    };

    fechar = () => {
        this.setState({ servicoSelecionado: null });
    };

    editar = () => {
        this.setState({ editando: true });
    };

    excluir = () => {
        const { servicoSelecionado } = this.state;
        if (servicoSelecionado) {
            const novoArrayServicos = this.servicos.filter(servico => servico.id !== servicoSelecionado.id);
            this.servicos = novoArrayServicos;
            this.setState({ servicoSelecionado: null });
        }
    };

    salvar = () => {
        const { servicoSelecionado, servicoEditado } = this.state;
        if (servicoSelecionado && servicoEditado) {
            const index = this.servicos.findIndex(servico => servico.id === servicoSelecionado.id);
            if (index !== -1) {
                this.servicos[index] = servicoEditado;
                this.setState({ servicoSelecionado: servicoEditado, editando: false });
            }
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            servicoEditado: {
                ...prevState.servicoEditado!,
                [name]: value
            }
        }));
    };

    render() {
        const { servicoSelecionado, editando, servicoEditado } = this.state;
        let estilo = `collection-item active ${this.props.tema}`;

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div>
                    <h4 className="component-title">Serviços</h4>
                    <div className="left">
                        <div className="collection">
                            {this.servicos.map((servico) => (
                                <a
                                    key={servico.nome}
                                    className="collection-item"
                                    onClick={() => this.servicoSelecionado(servico)}
                                >
                                    {servico.nome}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="table.responsive-table">
                        {servicoSelecionado && !editando && (
                            <div className="selecionado">
                                <h3>{servicoSelecionado.nome}</h3>
                                <p><strong>ID:</strong> {servicoSelecionado.id}</p>
                                <p><strong>Preço:</strong> {servicoSelecionado.valor}</p>
                                <button onClick={this.fechar} className="btn">Fechar</button>
                                <button onClick={this.editar} className="btn">Editar</button>
                                <button onClick={this.excluir} className="btn red">Excluir Serviço</button>
                            </div>
                        )}

                        {servicoSelecionado && editando && (
                            <div className="selecionado">
                                <h3>Editar Cliente</h3>
                                <div className="input-field">
                                    <input type="text" name="nome" value={servicoEditado!.nome} onChange={this.handleChange} />
                                    <label className="active">Nome</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="valor" value={servicoEditado!.valor} onChange={this.handleChange} />
                                    <label className="active">Preço</label>
                                </div>
                                <button onClick={this.salvar} className="btn">Salvar</button>
                                <button onClick={this.fechar} className="btn">Fechar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}