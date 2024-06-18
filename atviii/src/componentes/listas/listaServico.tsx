/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type Props = {
    tema: string
}

type Servico = {
    id: number;
    nome: string;
    valor: string;
};

const ListaServico: React.FC<Props> = ({ tema }) => {
    const [servicos, setServicos ] = useState<Servico[]>
    ([
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
    ]);

    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
    const [editando, setEditando] = useState(false);
    const [servicoEditado, setServicoEditado] = useState<Servico | null>(null);


    const selecionarServico = (servico: Servico) => {
        setServicoSelecionado(servico);
        setEditando(false);
        setServicoEditado(servico);
    };

    const fechar = () => {
        setServicoSelecionado(null);
        setEditando(false);
    };

    const editar = () => {
        setEditando(true);
    };

    const excluir = () => {
        if (servicoSelecionado) {
            setServicos(servicos.filter(servico => servico.id !== servicoSelecionado.id));
            setServicoSelecionado(null);
        }
    };

    const salvar = () => {
        if (servicoSelecionado && servicoEditado) {
            setServicos(servicos.map(servico => servico.id === servicoSelecionado.id ? servicoEditado : servico));
            setServicoSelecionado(servicoEditado);
            setEditando(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (servicoEditado) {
            setServicoEditado({
                ...servicoEditado,
                [name]: value
            });
        }
    };

    return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div>
                    <h4 className="component-title">Serviços</h4>
                    <div className="left">
                        <div className="collection">
                            {servicos.map((servico) => (
                                <a
                                    key={servico.nome}
                                    className="collection-item"
                                    onClick={() => selecionarServico(servico)}
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
                                <button onClick={fechar} className="btn">Fechar</button>
                                <button onClick={editar} className="btn">Editar</button>
                                <button onClick={excluir} className="btn red">Excluir Serviço</button>
                            </div>
                        )}

                        {servicoSelecionado && editando && (
                            <div className="selecionado">
                                <h3>Editar Cliente</h3>
                                <div className="input-field">
                                    <input type="text" name="nome" value={servicoEditado!.nome} onChange={handleChange} />
                                    <label className="active">Nome</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="valor" value={servicoEditado!.valor} onChange={handleChange} />
                                    <label className="active">Preço</label>
                                </div>
                                <button onClick={salvar} className="btn">Salvar</button>
                                <button onClick={fechar} className="btn">Fechar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
export default ListaServico;