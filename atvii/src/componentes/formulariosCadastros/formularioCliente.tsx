import { Component } from "react";

type props = {
    tema: string
}

type State = {
    novoCliente: {
        nome: string;
        nomeSocial: string;
        genero: string;
        cpf: string;
        rg: string;
        telefone: string;
    };
    mensagemSucesso: string | null;
};

export default class FormularioCadastroCliente extends Component<props, State> {

    state: State = {
        novoCliente: {
            nome: "",
            nomeSocial: "",
            genero: "",
            cpf: "",
            rg: "",
            telefone: ""
        },
        mensagemSucesso: null
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            novoCliente: {
                ...prevState.novoCliente,
                [name]: value
            }
        }));
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Novo cliente:", this.state.novoCliente);

        this.setState({ mensagemSucesso: "Cliente cadastrado com sucesso!" });

        this.setState({
            novoCliente: {
                nome: "",
                nomeSocial: "",
                genero: "",
                cpf: "",
                rg: "",
                telefone: ""
            }
        });
    };

    render() {
        const { novoCliente, mensagemSucesso } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}` // define classe CSS para o botão

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}> {/* ocupa 12 colunas em telas pequenas */}
                        <h4>Cadastrar Cliente</h4>

                        <div>
                            <div className="row">
                                <div className="input-field col s6"> {/* campo de entrada */}
                                    <input
                                        id="nome"
                                        type="text"
                                        className="validate"
                                        name="nome"
                                        value={novoCliente.nome}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="nome">Nome completo</label>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        id="nome_social"
                                        type="text"
                                        className="validate"
                                        name="nomeSocial"
                                        value={novoCliente.nomeSocial}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="nome_social">Nome social</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        id="genero"
                                        type="text"
                                        className="validate"
                                        name="genero"
                                        value={novoCliente.genero}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="genero">Gênero</label>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        id="cpf"
                                        type="text"
                                        className="validate"
                                        name="cpf"
                                        value={novoCliente.cpf}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="cpf">CPF</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        id="rg"
                                        type="text"
                                        className="validate"
                                        name="rg"
                                        value={novoCliente.rg}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="rg">RG</label>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        id="telefone"
                                        type="text"
                                        className="validate"
                                        name="telefone"
                                        value={novoCliente.telefone}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="telefone">Telefone</label>
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