import React, { useState, useEffect } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formulariosCadastros/formularioCliente";
import FormularioCadastroProduto from "./formulariosCadastros/formularioProduto";
import FormularioCadastroServico from "./formulariosCadastros/formularioServico";
import ListaCliente from "./listas/listaCliente";
import ListaProduto from "./listas/listaProduto";
import ListaServico from "./listas/listaServico";
import RegistroCompras from "./compras/registroCompras";

type ClienteDados = {
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

type Cliente = {
    nome: string;
    valorGasto: number;
    produtosConsumidos: string[];
    servicosConsumidos: string[];
}

const Roteador: React.FC = () => {
    const [tela, setTela] = useState<string>('Clientes');
    const [opcoes, setOpcoes] = useState<boolean>(false);
    const [cadastro, setCadastro] = useState<string | null>(null);
    const [clientes, setClientes] = useState<ClienteDados[]>([]);

    useEffect(() => {
    }, []);

    // método para selecionar a view com base na tela clicada
    const selecionarView = (novaTela: string, evento?: React.MouseEvent<HTMLAnchorElement>) => {
        if (evento) {
            evento.preventDefault();
        }
        if (tela !== novaTela) {
            setTela(novaTela);
            setOpcoes(false);
            setCadastro(null);
        }
    };

    // método para alternar a visibilidade das opções de cadastro
    const toggleCadastros = (evento: React.MouseEvent<HTMLButtonElement>) => {
        evento.preventDefault()
        setOpcoes(prevState => !prevState);
    };

    const selecionarCadastro = (novoCadastro: string, evento?: React.MouseEvent<HTMLButtonElement>) => {
        if (evento) {
            evento.preventDefault();
        }
        if (cadastro !== novoCadastro) {
            setCadastro(novoCadastro);
        }
    };

    const atualizarClientes = (clientes: ClienteDados[]) => {
        // atualizar os clientes e recalcular os rankings
        const topClientes = calcularTopClientes(clientes);
        setClientes(clientes);
    };

    const calcularTopClientes = (clientes: ClienteDados[]) => {
        const clientesMaisGastaram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => b.valorGasto - a.valorGasto)
            .slice(0, 5);

        const clientesMaisConsumiram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (b.produtosConsumidos.length + b.servicosConsumidos.length) - (a.produtosConsumidos.length + a.servicosConsumidos.length))
            .slice(0, 5);

        const clientesMenosConsumiram = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);

        const vendasGenero = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);
        
        
        const vendasGerais = [...clientes]
            .map(cliente => ({
                nome: cliente.nome,
                valorGasto: calcularValorGasto(cliente),
                produtosConsumidos: cliente.produtosConsumidos,
                servicosConsumidos: cliente.servicosConsumidos,
            }))
            .sort((a, b) => (a.produtosConsumidos.length + a.servicosConsumidos.length) - (b.produtosConsumidos.length + b.servicosConsumidos.length))
            .slice(0, 5);
        
        return { clientesMaisGastaram, clientesMaisConsumiram, clientesMenosConsumiram, vendasGenero, vendasGerais };
    }

    const calcularValorGasto = (cliente: ClienteDados) => {
        // suponha que o valor de cada produto ou serviço seja 100 para simplificação
        const valorProduto = 100;
        const valorServico = 100;
        return (cliente.produtosConsumidos.length * valorProduto) + (cliente.servicosConsumidos.length * valorServico);
    }

    const voltar = () => {
        setTela('Clientes');
    };

    let barraNavegacao = (
        <BarraNavegacao seletorView={selecionarView} tema="purple lighten-4" 
        botoes={['Cadastrar Cliente', 'Cadastrar Produto', 'Cadastrar Serviço', 'Clientes', 'Produtos', 'Serviços', 'Compras', 'Top Clientes']} 
        />
    );
    let tema = "purple lighten-4";

    return (
            <>
                {barraNavegacao}
                {tela === 'Clientes' && <ListaCliente tema={tema} />}
                {tela === 'Produtos' && <ListaProduto tema={tema} />}
                {tela === 'Serviços' && <ListaServico tema={tema} />}
                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema={tema} />}
                {tela === 'Cadastrar Produto' && <FormularioCadastroProduto tema={tema} />}
                {tela === 'Cadastrar Serviço' && <FormularioCadastroServico tema={tema} />}
                {tela === 'Compras' && (
                    <RegistroCompras
                        tema={tema}
                        clientes={clientes}
                        atualizarClientes={atualizarClientes}
                        voltar={voltar}
                    />
                )}
            </>
        );

    }
    export default Roteador;
