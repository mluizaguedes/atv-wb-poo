import React, { useState } from "react";

type Props = {
    tema: string
}

type Cliente = {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    telefones: string[];
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [novoCliente, setNovoCliente] = useState<Cliente>
        ({
            nome: "",
            nomeSocial: "",
            genero: "",
            cpf: "",
            rgs: [""],
            telefones: [""]
        });
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Cliente) => {
        const { value } = event.target;
        if (field === "rgs" || field === "telefones") {
            const updatedArray = [...novoCliente[field]];
            updatedArray[index] = value;
            setNovoCliente({
                ...novoCliente,
                [field]: updatedArray
            });
        } else {
            setNovoCliente({
                ...novoCliente,
                [field]: value
            });
        }
    };

    const handleAddField = (field: keyof Cliente) => {
        if (field === "rgs" || field === "telefones") {
            setNovoCliente({
                ...novoCliente,
                [field]: [...novoCliente[field], ""]
            });
        }
    };

    const handleRemoveField = (index: number, field: keyof Cliente) => {
        if (field === "rgs" || field === "telefones") {
            setNovoCliente({
                ...novoCliente,
                [field]: novoCliente[field].filter((_: string, i: number) => i !== index)
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Novo cliente:", novoCliente);

        setMensagemSucesso("Cliente cadastrado com sucesso!");

        setNovoCliente({
            nome: "",
            nomeSocial: "",
            genero: "",
            cpf: "",
            rgs: [""],
            telefones: [""]
        });
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
                                    onChange={(e) => handleChange(e, 0, "nome")}
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
                                    onChange={(e) => handleChange(e, 0, "nomeSocial")}
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
                                    onChange={(e) => handleChange(e, 0, "genero")}
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
                                    onChange={(e) => handleChange(e, 0, "cpf")}
                                />
                                <label htmlFor="cpf">CPF</label>
                            </div>
                        </div>
                        <div className="row">
                            {novoCliente.rgs.map((rg, index) => (
                                <div className="input-field col s6" key={index}>
                                    <input
                                        id={`rg-${index}`}
                                        type="text"
                                        className="validate"
                                        name={`rg-${index}`}
                                        value={rg}
                                        onChange={(e) => handleChange(e, index, "rgs")}
                                    />
                                    <label htmlFor={`rg-${index}`}>RG {index + 1}</label>
                                    <button type="button" className="btn red" onClick={() => handleRemoveField(index, "rgs")}>Remover</button>
                                </div>
                            ))}
                            <button type="button" className="btn" onClick={() => handleAddField("rgs")}>Adicionar RG</button>
                        </div>
                        <div className="row">
                            {novoCliente.telefones.map((telefone, index) => (
                                <div className="input-field col s6" key={index}>
                                    <input
                                        id={`telefone-${index}`}
                                        type="text"
                                        className="validate"
                                        name={`telefone-${index}`}
                                        value={telefone}
                                        onChange={(e) => handleChange(e, index, "telefones")}
                                    />
                                    <label htmlFor={`telefone-${index}`}>Telefone {index + 1}</label>
                                    <button type="button" className="btn red" onClick={() => handleRemoveField(index, "telefones")}>Remover</button>
                                </div>
                            ))}
                            <button type="button" className="btn" onClick={() => handleAddField("telefones")}>Adicionar Telefone</button>
                        </div>
                        <div className="row">
                            <div className="col-s12">
                                <button className="button" type="submit" name="action">Cadastrar
                                    <i className="material-icons right">send</i>
                                </button>
                                {mensagemSucesso && <p>{mensagemSucesso}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default FormularioCadastroCliente;