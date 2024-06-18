import { Component } from "react";

type props = {
    tema: string
}

type State = {
    novoServico: {
        nome: string;
        preco: string;
        descricao: string;
    };
    mensagemSucesso: string | null;
};

export default class FormularioCadastroServico extends Component<props, State> {

    state: State = {
        novoServico: {
            nome: "",
            preco: "",
            descricao: ""
        },
        mensagemSucesso: null
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            novoServico: {
                ...prevState.novoServico,
                [name]: value
            }
        }));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Novo serviço:", this.state.novoServico);

        this.setState({ mensagemSucesso: "Serviço cadastrado com sucesso!" });

        this.setState({
            novoServico: {
                nome: "",
                preco: "",
                descricao: ""
            },
        });
    };

    render() {
        const { novoServico, mensagemSucesso } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}` // define classe CSS para o botão

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}> {/* ocupa 12 colunas em telas pequenas */}
                        <h4>Cadastrar Serviço</h4>

                        <div>
                            <div className="row">
                                <div className="input-field col s6"> {/* campo de entrada */}
                                    <input
                                        id="nome"
                                        type="text"
                                        className="validate"
                                        name="nome"
                                        value={novoServico.nome}
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
                                        value={novoServico.preco}
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
                                        value={novoServico.descricao}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="descricao">Descrição</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className="button" type="submit" name="action">Cadastrar
                                        <i className="material-icons right">send</i>
                                    </button>
                                    {mensagemSucesso && <p>{mensagemSucesso}</p>}
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