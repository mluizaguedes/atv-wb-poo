import React, { useState, useEffect } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formulariosCadastros/formularioCliente";
import FormularioCadastroProduto from "./formulariosCadastros/formularioProduto";
import FormularioCadastroServico from "./formulariosCadastros/formularioServico";
import ListaCliente from "./listas/listaCliente";
import ListaProduto from "./listas/listaProduto";
import ListaServico from "./listas/listaServico";

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

    const atualizarClientes = (clientes: ClienteDados[]) => {
        setClientes(clientes);
    };

    const voltar = () => {
        setTela('Clientes');
    };

    let barraNavegacao = (
        <BarraNavegacao seletorView={selecionarView} tema="purple lighten-4" 
        botoes={['Clientes', 'Produtos', 'Serviços', 'Cadastrar Cliente', 'Cadastrar Produto', 'Cadastrar Serviço']} 
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
            </>
        );

    }
    export default Roteador;
