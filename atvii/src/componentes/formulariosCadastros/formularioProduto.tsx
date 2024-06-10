import { Component } from "react";

type props = {
    tema: string
}

type State = {
    novoProduto: {
        nome: string;
        preco: string;
        descricao: string;
    };
    mensagemSucesso: string | null;
};

export default class FormularioCadastroProduto extends Component<props, State> {

    state: State = {
        novoProduto: {
            nome: "",
            preco: "",
            descricao: ""
        },
        mensagemSucesso: null
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            novoProduto: {
                ...prevState.novoProduto,
                [name]: value
            }
        }));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Novo produto:", this.state.novoProduto);

        this.setState({ mensagemSucesso: "Produto cadastrado com sucesso!" });

        this.setState({
            novoProduto: {
                nome: "",
                preco: "",
                descricao: ""
            },
        });
    };

    render() {
        const { novoProduto, mensagemSucesso } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}` // define classe CSS para o botão

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}> {/* ocupa 12 colunas em telas pequenas */}
                        <h4>Cadastrar Produto</h4>

                        <div>
                            <div className="row">
                                <div className="input-field col s6"> {/* campo de entrada */}
                                    <input
                                        id="nome"
                                        type="text"
                                        className="validate"
                                        name="nome"
                                        value={novoProduto.nome}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="nome">Nome</label>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        id="preco"
                                        type="text"
                                        className="validate"
                                        name="preco"
                                        value={novoProduto.preco}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="preco">Preço</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        id="descricao"
                                        type="text"
                                        className="validate"
                                        name="descricao"
                                        value={novoProduto.descricao}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="descricao">Descrição</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className={estiloBotao} type="submit" name="action">Cadastrar
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {mensagemSucesso && <p>{mensagemSucesso}</p>}
                    </form>
                </div>
            </div>
        )
    }
}