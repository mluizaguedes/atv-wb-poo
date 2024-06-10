/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import '../componentes.css';

type Props = {
    tema: string;
    lista: {
        clientesMaisGastaram: ClienteDados[];
        clientesMaisConsumiram: ClienteDados[];
        clientesMenosConsumiram: ClienteDados[];
        vendasGenero: ClienteDados[];
        vendasGerais: ClienteDados[];
    };
};

type ClienteDados = {
    nome: string;
    valorGasto: number;
    produtosConsumidos: string[];
    servicosConsumidos: string[];
};

type State = {
    listaSelecionada: string | null;
};

export default class TopLista extends Component<Props, State> {
    state: State = {
        listaSelecionada: null,
    };

    listaSelecionada = (lista: string) => {
        this.setState({ listaSelecionada: lista });
    };

    render() {
        const { clientesMaisGastaram, clientesMaisConsumiram, clientesMenosConsumiram, vendasGenero, vendasGerais } = this.props.lista;
        const { listaSelecionada } = this.state;

        let estilo = `collection-item active ${this.props.tema}`;

        const renderLista = (clientes: ClienteDados[], titulo: string) => (
            <div>
                <h4 className="component-title">{titulo}</h4>
                <ul className="collection">
                    {clientes.map((cliente, index) => (
                        <li key={index} className="collection-item">
                            <span className="badge">{index + 1}</span>
                            <div>
                                <strong>{cliente.nome}</strong>
                                <p>Valor Gasto: {cliente.valorGasto}</p>
                                <p>Produtos Consumidos: {cliente.produtosConsumidos.join(", ")}</p>
                                <p>Serviços Consumidos: {cliente.servicosConsumidos.join(", ")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div>
                    {renderLista(clientesMaisGastaram, "Top 5 Clientes que Mais Gastaram")}
                    {renderLista(clientesMaisConsumiram, "Top 10 Clientes que Mais Consumiram")}
                    {renderLista(clientesMenosConsumiram, "Top 10 Clientes que Menos Consumiram")}
                    {renderLista(vendasGenero, "Top Vendas por Gênero")}
                    {renderLista(vendasGerais, "Top Vendas")}
                </div>
            </div>
        );
    }
}

