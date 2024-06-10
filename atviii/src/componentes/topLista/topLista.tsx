/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState  } from "react";
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

const TopLista: React.FC<Props> = ({ tema, lista }) => {
    const [listaSelecionada, setListaSelecionada] = useState<string | null>(null);

    const renderLista = (clientes: ClienteDados[], titulo: string) => (
            <div>
                <h5 className="component-title">{titulo}</h5>
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
                    {renderLista(lista.clientesMaisGastaram, "Top 5 Clientes que Mais Gastaram")}
                    {renderLista(lista.clientesMaisConsumiram, "Top 10 Clientes que Mais Consumiram")}
                    {renderLista(lista.clientesMenosConsumiram, "Top 10 Clientes que Menos Consumiram")}
                    {renderLista(lista.vendasGenero, "Top Vendas por Gênero")}
                    {renderLista(lista.vendasGerais, "Top Vendas")}
                </div>
            </div>
        );
    }

export default TopLista;