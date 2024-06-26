/* eslint-disable jsx-a11y/anchor-is-valid */
/* import { Component, MouseEvent } from "react"; */
import React, { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './componentes.css';

type Props = {
    seletorView: (tela: string, evento: React.MouseEvent<HTMLAnchorElement>) => void;
    tema: string;
    botoes: string[];
};

const BarraNavegacao: React.FC<Props> = ({ seletorView, tema, botoes }) => {
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
        });
    }, []);

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            return botoes.map(valor => (
                <li key={valor}><a onClick={(e) => seletorView(valor, e)}>{valor}</a></li>
            ));
        }
    };

    return (
        <>
            <nav className="nav">
                <a className="brand-logo">WB</a>
                <a data-target="mobile-menu" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
                <div className="nav-wrapper">
                    <ul className="right hide-on-med-and-down">
                        {gerarListaBotoes()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {gerarListaBotoes()} {/* chama o método para gerar os botões no menu lateral */}
            </ul>
        </>
    )
}
export default BarraNavegacao;