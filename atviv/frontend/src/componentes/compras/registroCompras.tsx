/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import '../componentes.css';
import Endereco from "../../modelo/endereco";

type Cliente = {
    nome: string;
    sobreNome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    email: string;
    dataCadastro: string;
    endereco: Endereco;
    telefones: string[];
    produtosConsumidos: string[];
    servicosConsumidos: string[];
}

type Props = {
    tema: string;
    clientes: Cliente[];
    atualizarClientes: (clientes: Cliente[]) => void;
    voltar: () => void;
};

const RegistroCompras: React.FC<Props> = ({ tema, clientes, atualizarClientes, voltar }) => {
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null); // Estado para armazenar o cliente selecionado.
    const [novaCompra, setNovaCompra] = useState({ tipo: '', nome: '' }); // Estado para armazenar os detalhes da nova compra.
    const [cpfInput, setCpfInput] = useState(''); // Estado para armazenar o CPF digitado no campo de entrada.

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Manipulador de evento para mudanças no campo de CPF.
        setCpfInput(event.target.value); // Atualiza o estado cpfInput.
        setClienteSelecionado(null); // Reseta o cliente selecionado.
    };

    const handleCompraChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Manipulador de evento para mudanças nos campos de tipo e nome da compra.
        const { name, value } = event.target;
        setNovaCompra(prevNovaCompra => ({
            ...prevNovaCompra,
            [name]: value
        }));
    };

    const adicionarCompra = () => { // Função para adicionar uma nova compra ao cliente selecionado.
        if (clienteSelecionado && novaCompra.nome && novaCompra.tipo) {
            if (novaCompra.tipo === "Produto") { // Se o tipo for Produto, adiciona ao array de produtosConsumidos.
                clienteSelecionado.produtosConsumidos.push(novaCompra.nome);
            } else if (novaCompra.tipo === "Serviço") { // Se o tipo for Serviço, adiciona ao array de servicosConsumidos.
                clienteSelecionado.servicosConsumidos.push(novaCompra.nome);
            }
            const novoArrayClientes = clientes.map(cliente => // Atualiza a lista de clientes com o cliente atualizado.
                cliente.cpf === clienteSelecionado.cpf ? clienteSelecionado : cliente
            );
            atualizarClientes(novoArrayClientes); // Chama a função para atualizar a lista de clientes.
            voltar(); // Chama a função para voltar à tela anterior.
        }
    };

    /* const handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === value) || null;
        setClienteSelecionado(clienteSelecionado);
    }; */

    const handleBuscarCliente = () => { // Função para buscar o cliente pelo CPF digitado.
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === cpfInput) || null;
        setClienteSelecionado(clienteSelecionado); // Atualiza o estado clienteSelecionado com o cliente encontrado.
    };

    return (
        <div>
            <h3 className="page-title"> World Beauty </h3>
            <div className={tema}>
                <h4>Registrar Compras</h4>

                <div className="input-field">
                    <style>
                        {`.cpf-compra::placeholder { color: gray; }`}
                    </style>
                    <input
                        type="text"
                        placeholder="CPF do Cliente"
                        value={cpfInput}
                        onChange={handleCPFChange}
                        className="cpf-compra"
                    />
                    <button onClick={handleBuscarCliente} className="btn">Buscar Cliente</button>
                </div>
                {clienteSelecionado && (
                    <>
                        <div>
                            <div className="input-field">
                                <label>Cliente: {clienteSelecionado.nome}</label>
                            </div>
                        </div>
                        <div className="input-field">
                            <input type="text" name="tipo" value={novaCompra.tipo} onChange={handleCompraChange} />
                            <label className="active">Tipo (Produto/Serviço)</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="nome" value={novaCompra.nome} onChange={handleCompraChange} />
                            <label className="active">Nome</label>
                        </div>
                        <button onClick={adicionarCompra} className="btn">Adicionar Compra</button>
                    </>
                )}
                <button onClick={voltar} className="btn">Voltar</button>
            </div>
        </div>
    );
}

export default RegistroCompras;