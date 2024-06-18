import React, { useState, useEffect } from "react";

type Props = {
    tema: string;
}

type NovoCliente = {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rg: string;
    telefone: string;
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [novoCliente, setNovoCliente] = useState<NovoCliente>
        ({
            nome: "",
            nomeSocial: "",
            genero: "",
            cpf: "",
            rg: "",
            telefone: ""
        });
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoCliente(prevState => ({
            ...prevState,
            [name]: value
        })); 
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!novoCliente.nome || !novoCliente.cpf || !novoCliente.rg || !novoCliente.telefone) {
            setMensagemErro('Todos os campos obrigatórios devem ser preenchidos.');
            setMensagemSucesso(null);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:32832/cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            if (response.ok) {
                setMensagemSucesso('Cliente cadastrado com sucesso!');
                console.log("Cliente:", novoCliente.nome)
                setMensagemErro(null);
                setNovoCliente({
                    nome: "",
                    nomeSocial: "",
                    genero: "",
                    cpf: "",
                    rg: "",
                    telefone: ""
                });
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar cliente:', errorData);
                setMensagemErro(`Erro ao cadastrar cliente: ${errorData.message}`);
                setMensagemSucesso(null);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setMensagemErro('Erro ao cadastrar cliente.');
            setMensagemSucesso(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    let estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div>
            <h3 className="page-title"> World Beauty </h3>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}> {/* ocupa 12 colunas em telas pequenas */}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                    {mensagemErro && <p className="error-message">{mensagemErro}</p>}
                </form>
            </div>
        </div>
    )
}
export default FormularioCadastroCliente;