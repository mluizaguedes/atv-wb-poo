/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
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

type Props = {
    tema: string;
    clientes: Cliente[];
    atualizarClientes: (clientes: Cliente[]) => void;
    voltar: () => void;
};

const RegistroCompras: React.FC<Props> = ({ tema, clientes, atualizarClientes, voltar }) => {
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [novaCompra, setNovaCompra] = useState({ tipo: '', nome: '' });
    const [cpfInput, setCpfInput] = useState('');

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCpfInput(event.target.value);
        setClienteSelecionado(null);
    };

    const handleCompraChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNovaCompra(prevNovaCompra => ({
            ...prevNovaCompra,
            [name]: value
        }));
    };

    const adicionarCompra = () => {
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
            voltar();
        }
    };

    /* const handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === value) || null;
        setClienteSelecionado(clienteSelecionado);
    }; */

    const handleBuscarCliente = () => {
        const clienteSelecionado = clientes.find(cliente => cliente.cpf === cpfInput) || null;
        setClienteSelecionado(clienteSelecionado);
    };

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
                    onChange={handleCPFChange}
                />
                <button onClick={handleBuscarCliente} className="btn">Buscar Cliente</button>
            </div>
            {clienteSelecionado && (
                <>
                    <div className="input-field">
                        <label>Cliente: {clienteSelecionado.nome}</label>
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