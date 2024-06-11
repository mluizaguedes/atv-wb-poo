import React, { useState } from "react";

type Props = {
    tema: string
}

type NovoProduto = {
    nome: string;
    preco: string;
    descricao: string;
};

const FormularioCadastroProduto: React.FC<Props> = ({ tema }) => {
    const [novoProduto, setNovoProduto] = useState<NovoProduto>
        ({
            nome: "",
            preco: "",
            descricao: ""
        })
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Novo produto:", novoProduto);

        setMensagemSucesso("Produto cadastrado com sucesso!");

        setNovoProduto({
            nome: "",
            preco: "",
            descricao: ""
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div>
            <h3 className="page-title"> World Beauty </h3>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}> {/* ocupa 12 colunas em telas pequenas */}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
export default FormularioCadastroProduto;