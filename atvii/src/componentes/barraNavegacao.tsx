/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component, MouseEvent } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './componentes.css';

type props = {
    seletorView: (tela: string, evento: MouseEvent<HTMLAnchorElement>) => void;
    tema: string;
    botoes: string[];
}

export default class BarraNavegacao extends Component<props> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this) //bind está garantindo que o método sempre mantenha a referência correta ao this do componente BarraNavegacao
    }

    // método do ciclo de vida do react chamado quando o componente é montado
    componentDidMount() {
        // adiciona evento ao DOM que inicializa o side-nav quando o conteúdo do documento é carregado
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems)
        });
    }

    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) { // se não tiver botões na lista
            return <></> //nada
        } else {
            let lista = this.props.botoes.map(valor => // mapeia a lista de botões para elementos <li> contendo <a>
                <li key={valor}><a onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a></li>
            )
            return lista
        }
    }

    render() {
        let estilo = `${this.props.tema}` // classe CSS com base no tema recebido nas props
        return (
            <>
                <nav className={estilo}>
                    <div className="nav-wrapper">
                        <a className="brand-logo"> WB </a>
                        <a data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>  {/* icon menu lateral em telas pequenas */}
                        <ul className="right hide-on-med-and-down">
                            {this.gerarListaBotoes()} {/* chama método para gerar os botões na barra de navegação */}
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-menu">
                    {this.gerarListaBotoes()} {/* chama o método para gerar os botões no menu lateral */}
                </ul>
            </>
        )
    }
}