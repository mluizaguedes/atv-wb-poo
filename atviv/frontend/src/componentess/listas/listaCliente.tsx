/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';
import { getClientes, getCliente, atualizarCliente, cadastrarCliente, excluirCliente } from '../clienteService';

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
        {
            "id": 2,
            "nome": "João",
            "sobreNome": "Pereira",
            "email": "joao@gmail.com",
            "endereco": {
                "codigoPostal": "13045-000",
                "rua": "Avenida Principal",
                "numero": "456",
                "bairro": "Vila Nova",
                "cidade": "Campinas",
                "estado": "São Paulo",
                "informacoesAdicionais": "Casa 5"
            },
            "telefones": ["(19) 99876-5432"]
        },
        {
            "id": 3,
            "nome": "Ana",
            "sobreNome": "Costa",
            "email": "ana@gmail.com",
            "endereco": {
                "codigoPostal": "12345-678",
                "rua": "Rua das Flores",
                "numero": "789",
                "bairro": "Jardim das Rosas",
                "cidade": "São Paulo",
                "estado": "São Paulo",
                "informacoesAdicionais": "Apartamento 303"
            },
            "telefones": ["(11) 91234-5678"]
        },
        {
            "id": 4,
            "nome": "Carlos",
            "sobreNome": "Mendes",
            "email": "carlos@gmail.com",
            "endereco": {
                "codigoPostal": "45678-910",
                "rua": "Rua dos Pinheiros",
                "numero": "321",
                "bairro": "Jardim América",
                "cidade": "Rio de Janeiro",
                "estado": "Rio de Janeiro",
                "informacoesAdicionais": "Casa 2"
            },
            "telefones": ["(21) 99876-5432"]
        },
        {
            "id": 5,
            "nome": "Fernanda",
            "sobreNome": "Oliveira",
            "email": "fernanda@gmail.com",
            "endereco": {
                "codigoPostal": "98765-432",
                "rua": "Rua do Sol",
                "numero": "654",
                "bairro": "Centro",
                "cidade": "Belo Horizonte",
                "estado": "Minas Gerais",
                "informacoesAdicionais": "Apartamento 202"
            },
            "telefones": ["(31) 91234-5678"]
        },
        {
            "id": 6,
            "nome": "Lucas",
            "sobreNome": "Almeida",
            "email": "lucas@gmail.com",
            "endereco": {
                "codigoPostal": "54321-098",
                "rua": "Rua das Estrelas",
                "numero": "987",
                "bairro": "Bairro Alto",
                "cidade": "Curitiba",
                "estado": "Paraná",
                "informacoesAdicionais": "Casa 10"
            },
            "telefones": ["(41) 99876-5432"]
        },
        {
            "id": 7,
            "nome": "Patricia",
            "sobreNome": "Gomes",
            "email": "patricia@gmail.com",
            "endereco": {
                "codigoPostal": "67890-123",
                "rua": "Rua da Lua",
                "numero": "123",
                "bairro": "Centro",
                "cidade": "Porto Alegre",
                "estado": "Rio Grande do Sul",
                "informacoesAdicionais": "Apartamento 305"
            },
            "telefones": ["(51) 91234-5678"]
        },
        {
            "id": 8,
            "nome": "Ricardo",
            "sobreNome": "Ferreira",
            "email": "ricardo@gmail.com",
            "endereco": {
                "codigoPostal": "12345-678",
                "rua": "Rua do Mar",
                "numero": "456",
                "bairro": "Centro",
                "cidade": "Florianópolis",
                "estado": "Santa Catarina",
                "informacoesAdicionais": "Casa 8"
            },
            "telefones": ["(48) 99876-5432"]
        },
        {
            "id": 9,
            "nome": "Mariana",
            "sobreNome": "Souza",
            "email": "mariana@gmail.com",
            "endereco": {
                "codigoPostal": "87654-321",
                "rua": "Rua das Nuvens",
                "numero": "789",
                "bairro": "Jardim Celeste",
                "cidade": "Fortaleza",
                "estado": "Ceará",
                "informacoesAdicionais": "Apartamento 405"
            },
            "telefones": ["(85) 91234-5678"]
        },
        {
            "id": 10,
            "nome": "Eduardo",
            "sobreNome": "Ribeiro",
            "email": "eduardo@gmail.com",
            "endereco": {
                "codigoPostal": "23456-789",
                "rua": "Rua do Vento",
                "numero": "321",
                "bairro": "Centro",
                "cidade": "Salvador",
                "estado": "Bahia",
                "informacoesAdicionais": "Casa 12"
            },
            "telefones": ["(71) 99876-5432"]
        },
        {
            "id": 11,
            "nome": "Beatriz",
            "sobreNome": "Nascimento",
            "email": "beatriz@gmail.com",
            "endereco": {
                "codigoPostal": "54321-876",
                "rua": "Rua do Horizonte",
                "numero": "654",
                "bairro": "Centro",
                "cidade": "Recife",
                "estado": "Pernambuco",
                "informacoesAdicionais": "Apartamento 101"
            },
            "telefones": ["(81) 91234-5678"]
        }, 
    ]);

    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await getClientes();
            setClientes(clientes);
        };
        fetchClientes();
    }, []);

    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [editando, setEditando] = useState(false);
    const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null);
    const [mostrarRegistroConsumo, setMostrarRegistroConsumo] = useState(false);

    const clienteSelecionadoHandler = async (cliente: Cliente) => {
        const clienteDetalhado = await getCliente(cliente.id);
        setClienteSelecionado(clienteDetalhado);
        setEditando(false);
        setClienteEditado(clienteDetalhado);
    };
    
    const salvar = async () => {
        if (clienteSelecionado && clienteEditado) {
            await atualizarCliente(clienteEditado);
            const novosClientes = clientes.map(c => c.id === clienteEditado.id ? clienteEditado : c);
            setClientes(novosClientes);
            setClienteSelecionado(clienteEditado);
            setEditando(false);
        }
    };
    
    const excluir = async () => {
        if (clienteSelecionado) {
            await excluirCliente(clienteSelecionado.id);
            const novosClientes = clientes.filter(cliente => cliente.id !== clienteSelecionado.id);
            setClientes(novosClientes);
            setClienteSelecionado(null);
        }
    };

    const fechar = () => {
        setClienteSelecionado(null);
    };

    const editar = () => {
        setEditando(true);
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
                                    <h3>{clienteSelecionado.nome + " " + clienteSelecionado.sobreNome}</h3>
                                    <p><strong>Email:</strong> {clienteSelecionado.email}</p>
                                    <p><strong>Telefone(s):</strong> {clienteSelecionado.telefones.join(", ")}</p>
                                    <p><strong>Código Postal:</strong> {clienteSelecionado.endereco.codigoPostal}</p>
                                    <p><strong>Código Postal:</strong> {clienteSelecionado.endereco.codigoPostal}</p>
                                    <p><strong>Rua:</strong> {clienteSelecionado.endereco.rua}</p>
                                    <p><strong>Número:</strong> {clienteSelecionado.endereco.numero}</p>
                                    <p><strong>Bairro:</strong> {clienteSelecionado.endereco.bairro}</p>
                                    <p><strong>Cidade:</strong> {clienteSelecionado.endereco.cidade}</p>
                                    <p><strong>Estado:</strong> {clienteSelecionado.endereco.estado}</p>
                                    <p><strong>Info:</strong> {clienteSelecionado.endereco.informacoesAdicionais}</p>
                                    <button onClick={fechar} className="btn">Fechar</button>
                                    <button onClick={editar} className="btn">Editar</button>
                                    <button onClick={excluir} className="btn red">Excluir Cliente</button>
                                    
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
                    <button onClick={voltar} className="btn">Voltar</button>
                </div>
            )}
        </div>
    );
}

export default ListaCliente;