/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';
import RegistroCompras from "../compras/registroCompras";

type Props = {
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

const ListaCliente: React.FC<Props> = ({ tema }) => {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            nome: "Maria Luiza",
            nomeSocial: "Maria",
            genero: "Feminino",
            cpf: "123.456.789-00",
            rgs: ["12345678-9/SP"],
            dataCadastro: "01/01/2020",
            telefones: ["(12) 98765-4321"],
            produtosConsumidos: ["Produto A", "Produto B"],
            servicosConsumidos: ["Serviço X", "Serviço Y"]
        },
        {
            nome: "Mateus Vieira",
            nomeSocial: "Mateus",
            genero: "Masculino",
            cpf: "987.654.321-00",
            rgs: ["98765432-1/PR"],
            dataCadastro: "02/04/2022",
            telefones: ["(11) 87654-3210"],
            produtosConsumidos: ["Produto C", "Produto D"],
            servicosConsumidos: ["Serviço Z"]
        },
        {
            nome: "Giovanna Xavier",
            nomeSocial: "Giovanna",
            genero: "Feminino",
            cpf: "111.222.333-44",
            rgs: ["11222333-4/SP"],
            dataCadastro: "01/01/2020",
            telefones: ["(12) 98765-4321"],
            produtosConsumidos: ["Produto E", "Produto F"],
            servicosConsumidos: ["Serviço A", "Serviço B"]
        },
        {
            nome: "César Reis",
            nomeSocial: "César",
            genero: "Masculino",
            cpf: "555.666.777-88",
            rgs: ["55666777-8/SP"],
            dataCadastro: "04/04/2024",
            telefones: ["(21) 87654-3210"],
            produtosConsumidos: ["Produto G", "Produto H"],
            servicosConsumidos: ["Serviço C"]
        },
        {
            nome: "Jessica Freire",
            nomeSocial: "Jessica",
            genero: "Feminino",
            cpf: "999.888.777-66",
            rgs: ["99888777-6/SP"],
            dataCadastro: "05/05/2017",
            telefones: ["(51) 98765-4321"],
            produtosConsumidos: ["Produto I", "Produto J"],
            servicosConsumidos: ["Serviço D", "Serviço E"]
        },
        {
            nome: "William Azevedo",
            nomeSocial: "William",
            genero: "Masculino",
            cpf: "222.333.444-55",
            rgs: ["22333444-5/SP"],
            dataCadastro: "06/06/2016",
            telefones: ["(61) 87654-3210"],
            produtosConsumidos: ["Produto K", "Produto L"],
            servicosConsumidos: ["Serviço F"]
        },
        {
            nome: "Julia Leão",
            nomeSocial: "Julia",
            genero: "Feminino",
            cpf: "333.444.555-66",
            rgs: ["33444555-6/SP"],
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
            rgs: ["44555666-7/SP"],
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
            rgs: ["55666777-8/SP"],
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
            rgs: ["66777888-9/SP"],
            dataCadastro: "10/10/2012",
            telefones: ["(11) 87654-3210"],
            produtosConsumidos: ["Produto S", "Produto T"],
            servicosConsumidos: ["Serviço L"]
        },
    ]);

    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [editando, setEditando] = useState(false);
    const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null);
    const [mostrarRegistroConsumo, setMostrarRegistroConsumo] = useState(false);

    const handleSelectCliente = (cliente: Cliente) => {
        setClienteSelecionado(cliente);
        setEditando(false);
        setClienteEditado(cliente);
    };

    const handleClose = () => {
        setClienteSelecionado(null);
    };

    const handleEdit = () => {
        setEditando(true);
    };

    const handleDelete = () => {
        if (clienteSelecionado) {
            const novoArrayClientes = clientes.filter(cliente => cliente.cpf !== clienteSelecionado.cpf);
            setClientes(novoArrayClientes);
            setClienteSelecionado(null);
        }
    };

    const handleSave = () => {
        if (clienteSelecionado && clienteEditado) {
            const index = clientes.findIndex(cliente => cliente.cpf === clienteSelecionado.cpf);
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
        setClienteEditado(prevState => ({
            ...prevState!,
            [name]: value
        }));
    };

    const handleRGChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newRGs = [...clienteEditado!.rgs];
        newRGs[index] = event.target.value;
        setClienteEditado(prevState => ({
            ...prevState!,
            rgs: newRGs
        }));
    };

    const addRG = () => {
        setClienteEditado(prevState => ({
            ...prevState!,
            rgs: [...prevState!.rgs, ""]
        }));
    };

    const removeRG = (index: number) => {
        const newRGs = [...clienteEditado!.rgs];
        newRGs.splice(index, 1);
        setClienteEditado(prevState => ({
            ...prevState!,
            rgs: newRGs
        }));
    };

    const handleTelefoneChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTelefones = [...clienteEditado!.telefones];
        newTelefones[index] = event.target.value;
        setClienteEditado(prevState => ({
            ...prevState!,
            telefones: newTelefones
        }));
    };

    const addTelefone = () => {
        setClienteEditado(prevState => ({
            ...prevState!,
            telefones: [...prevState!.telefones, ""]
        }));
    };

    const removeTelefone = (index: number) => {
        const newTelefones = [...clienteEditado!.telefones];
        newTelefones.splice(index, 1);
        setClienteEditado(prevState => ({
            ...prevState!,
            telefones: newTelefones
        }));
    };

    const handleMostrarRegistroConsumo = () => {
        setMostrarRegistroConsumo(true);
    };

    const handleVoltar = () => {
        setMostrarRegistroConsumo(false);
    };

    const atualizarClientes = (clientes: Cliente[]) => {
        setClientes(clientes);
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
                                        key={cliente.nome}
                                        className="collection-item"
                                        onClick={() => handleSelectCliente(cliente)}
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
                                    <p><strong>Nome Social:</strong> {clienteSelecionado.nomeSocial}</p>
                                    <p><strong>Sexo:</strong> {clienteSelecionado.genero}</p>
                                    <p><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
                                    <p><strong>RG(s):</strong> {clienteSelecionado.rgs.join(", ")}</p>
                                    <p><strong>Data de Cadastro:</strong> {clienteSelecionado.dataCadastro}</p>
                                    <p><strong>Telefone(s):</strong> {clienteSelecionado.telefones.join(", ")}</p>
                                    <p><strong>Produtos Consumidos:</strong> {clienteSelecionado.produtosConsumidos.join(", ")}</p>
                                    <p><strong>Serviços Consumidos:</strong> {clienteSelecionado.servicosConsumidos.join(", ")}</p>
                                    <button onClick={handleClose} className="btn">Fechar</button>
                                    <button onClick={handleEdit} className="btn">Editar</button>
                                    <button onClick={handleDelete} className="btn red">Excluir Cliente</button>
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
                                        <input type="text" name="nomeSocial" value={clienteEditado!.nomeSocial} onChange={handleChange} />
                                        <label className="active">Nome Social</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="genero" value={clienteEditado!.genero} onChange={handleChange} />
                                        <label className="active">Sexo</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="cpf" value={clienteEditado!.cpf} onChange={handleChange} />
                                        <label className="active">CPF</label>
                                    </div>
                                    <div className="input-field">
                                        <label className="active">RG(s)</label>
                                        {clienteEditado!.rgs.map((rg, index) => (
                                            <div key={index}>
                                                <input type="text" value={rg} onChange={(e) => handleRGChange(index, e)} />
                                                <button onClick={() => removeRG(index)} className="btn-remover">Excluir RG</button>
                                            </div>
                                        ))}
                                        <button onClick={addRG} className="btn-adicionar">Adicionar RG</button>
                                    </div>
                                    <div className="input-field">
                                        <label className="active">Telefone(s)</label>
                                        {clienteEditado!.telefones.map((telefone, index) => (
                                            <div key={index}>
                                                <input type="text" value={telefone} onChange={(e) => handleTelefoneChange(index, e)} />
                                                <button onClick={() => removeTelefone(index)} className="btn-remover">Excluir Telefone</button>
                                            </div>
                                        ))}
                                        <button onClick={addTelefone} className="btn-adicionar">Adicionar Telefone</button>
                                    </div>
                                    <button onClick={handleSave} className="btn">Salvar</button>
                                    <button onClick={handleClose} className="btn">Fechar</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <RegistroCompras
                    tema={tema}
                    clientes={clientes}
                    atualizarClientes={atualizarClientes}
                    voltar={handleVoltar}
                />
            )}
        </div>
    );
};

export default ListaCliente;