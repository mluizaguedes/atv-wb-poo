/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';

type Props = {
    tema: string
}

type Endereco = {
    codigoPostal: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    informacoesAdicionais: string;
}

type Cliente = {
    id: number,
    nome: string;
    sobreNome: string; 
    email: string; 
    endereco: Endereco;
    telefones: string[];
};

const ListaCliente: React.FC<Props> = ({ tema }) => {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: "Maria",
            sobreNome: "Silva",
            email: "maria@gmail.com",
            endereco: {
                codigoPostal: "12230-000",
                rua: "Rua Tal",
                numero: "123",
                bairro: "Centro",
                cidade: "São José dos Campos",
                estado: "São Paulo",
                informacoesAdicionais: "Apartamento 101",
            },
            telefones: ["(12) 98765-4321"],
        },
    ]);

    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [editando, setEditando] = useState(false);
    const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null);
    const [mostrarRegistroConsumo, setMostrarRegistroConsumo] = useState(false);

    const clienteSelecionadoHandler = (cliente: Cliente) => {
        setClienteSelecionado(cliente);
        setEditando(false);
        setClienteEditado(cliente);
    };

    const fechar = () => {
        setClienteSelecionado(null);
    };

    const editar = () => {
        setEditando(true);
    };

    const excluir = () => {
        if (clienteSelecionado) {
            const novoArrayClientes = clientes.filter(cliente => cliente.id !== clienteSelecionado.id);
            setClientes(novoArrayClientes);
            setClienteSelecionado(null);
        }
    };

    const salvar = () => {
        if (clienteSelecionado && clienteEditado) {
            const index = clientes.findIndex(cliente => cliente.id === clienteSelecionado.id);
            if (index !== -1) {
                const novosClientes = [...clientes];
                novosClientes[index] = clienteEditado;
                setClientes(novosClientes);
                setClienteSelecionado(clienteEditado);
                setEditando(false);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setClienteEditado(prevClienteEditado => ({
            ...prevClienteEditado!,
            [name]: value
        }));
    };

    const handleTelefoneChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const telefones = event.target.value.split(',').map(tel => tel.trim());
        setClienteEditado(prevClienteEditado => ({
            ...prevClienteEditado!,
            telefones: telefones
        }));
    };

    const mostrarRegistroConsumoHandler = () => {
        setMostrarRegistroConsumo(true);
    };

    const voltar = () => {
        setMostrarRegistroConsumo(false);
    };

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
                                        key={cliente.id}
                                        className="collection-item"
                                        onClick={() => clienteSelecionadoHandler(cliente)}
                                    >
                                        {cliente.nome}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="table.responsive-table">
                            {clienteSelecionado && !editando && (
                                <div className="selecionado">
                                    <h3>{clienteSelecionado.nome}</h3>
                                    <p><strong>Telefone(s):</strong> {clienteSelecionado.telefones.join(", ")}</p>
                                    <button onClick={fechar} className="btn">Fechar</button>
                                    <button onClick={editar} className="btn">Editar</button>
                                    <button onClick={excluir} className="btn red">Excluir Cliente</button>
                                    <button onClick={mostrarRegistroConsumoHandler} className="btn">Registrar Consumo</button>
                                </div>
                            )}

                            {clienteSelecionado && editando && (
                                <div className="selecionado">
                                    <h3>Editar Cliente</h3>
                                    <div className="input-field">
                                        <input type="text" name="nome" value={clienteEditado!.nome} onChange={handleChange} />
                                        <label className="active">Nome</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="sobreNome" value={clienteEditado!.sobreNome} onChange={handleChange} />
                                        <label className="active">Sobrenome</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="email" value={clienteEditado!.email} onChange={handleChange} />
                                        <label className="active">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <textarea name="telefones" className="materialize-textarea" value={clienteEditado!.telefones.join(", ")} onChange={handleTelefoneChange}></textarea>
                                        <label className="active">Telefone(s)</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="codigoPostal" value={clienteEditado!.endereco.codigoPostal} onChange={handleChange} />
                                        <label className="active">Código Postal</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="rua" value={clienteEditado!.endereco.rua} onChange={handleChange} />
                                        <label className="active">Rua</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="numero" value={clienteEditado!.endereco.numero} onChange={handleChange} />
                                        <label className="active">Número</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="bairro" value={clienteEditado!.endereco.bairro} onChange={handleChange} />
                                        <label className="active">Bairro</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="cidade" value={clienteEditado!.endereco.cidade} onChange={handleChange} />
                                        <label className="active">Cidade</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="estado" value={clienteEditado!.endereco.estado} onChange={handleChange} />
                                        <label className="active">Estado</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="informacoesAdicionais" value={clienteEditado!.endereco.informacoesAdicionais} onChange={handleChange} />
                                        <label className="active">Informações Adicionais</label>
                                    </div>
                                    <button onClick={salvar} className="btn">Salvar</button>
                                    <button onClick={fechar} className="btn">Fechar</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Componente para registro de consumo */}
                    <button onClick={voltar} className="btn">Voltar</button>
                </div>
            )}
        </div>
    );
}

export default ListaCliente;