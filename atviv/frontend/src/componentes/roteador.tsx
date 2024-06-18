import React, { useState, useEffect } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCliente";
import ListaCliente from "./listaCliente";

const Roteador: React.FC = () => {
    const [tela, setTela] = useState<string>('Clientes');
    const [opcoes, setOpcoes] = useState<boolean>(false);
    const [cadastro, setCadastro] = useState<string | null>(null);

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

    let barraNavegacao = (
        <BarraNavegacao seletorView={selecionarView} tema="purple lighten-4" 
        botoes={['Cadastrar Cliente', 'Clientes']} 
        />
    );
    let tema = "purple lighten-4";

    return (
            <>
                {barraNavegacao}
                {tela === 'Clientes' && <ListaCliente tema={tema} />}
                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema={tema} />}
            </>
        );

    }
    export default Roteador;
