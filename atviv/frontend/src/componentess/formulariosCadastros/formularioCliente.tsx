import React, { useState } from "react";
import '../componentes.css';
import { cadastrarCliente } from '../clienteService';

type Props = {
    tema: string;
}

type Endereco = {
    codigoPostal: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    informacoesAdicionais: string;
}

type Cliente = {
    id: number;
    nome: string;
    sobreNome: string;
    email: string;
    endereco: Endereco;
    telefones: string[];
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        sobreNome: '',
        email: '',
        endereco: {
            codigoPostal: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            informacoesAdicionais: '',
        },
        telefones: []
    });
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name in cliente.endereco) {
            setCliente({
                ...cliente,
                endereco: {
                    ...cliente.endereco,
                    [name]: value
                }
            });
        } else {
            setCliente({
                ...cliente,
                [name]: value
            });
        }
    };

    const handleTelefoneChange = (index: number, value: string) => {
        const novosTelefones = [...cliente.telefones];
        novosTelefones[index] = value;
        setCliente({ ...cliente, telefones: novosTelefones });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!cliente.nome ||
            !cliente.sobreNome ||
            !cliente.email ||
            !cliente.endereco ||
            !cliente.endereco.codigoPostal ||
            !cliente.endereco.rua ||
            !cliente.endereco.numero ||
            !cliente.endereco.bairro ||
            !cliente.endereco.cidade ||
            !cliente.endereco.estado ||
            cliente.telefones.length === 0) {

            setMensagemErro('Todos os campos obrigatórios devem ser preenchidos.');
            setMensagemSucesso(null);
            return;
        }

        setIsSubmitting(true);

        try {
            await cadastrarCliente(cliente);
            setMensagemSucesso('Cliente cadastrado com sucesso!');
            setMensagemErro(null);
            setCliente({
                id: 0,
                nome: '',
                sobreNome: '',
                email: '',
                endereco: {
                    codigoPostal: '',
                    rua: '',
                    numero: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    informacoesAdicionais: '',
                },
                telefones: []
            });
        } catch (error) {
            console.error('Erro na requisição:', error);
            setMensagemErro('Erro ao cadastrar cliente.');
            setMensagemSucesso(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h3 className="page-title">World Beauty</h3>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>Cadastrar Cliente</h4>

                    <div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="nome"
                                    type="text"
                                    className="validate"
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={handleChange}
                                />
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="sobreNome"
                                    type="text"
                                    className="validate"
                                    name="sobreNome"
                                    value={cliente.sobreNome}
                                    onChange={handleChange}
                                />
                                <label htmlFor="sobreNome">Sobrenome</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    name="email"
                                    value={cliente.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="telefone"
                                    type="text"
                                    className="validate"
                                    value={cliente.telefones[0] || ''}
                                    onChange={(e) => handleTelefoneChange(0, e.target.value)}
                                />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="codigoPostal"
                                    type="text"
                                    className="validate"
                                    name="codigoPostal"
                                    value={cliente.endereco.codigoPostal}
                                    onChange={handleChange}
                                />
                                <label htmlFor="codigoPostal">Código Postal</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="rua"
                                    type="text"
                                    className="validate"
                                    name="rua"
                                    value={cliente.endereco.rua}
                                    onChange={handleChange}
                                />
                                <label htmlFor="rua">Rua</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="numero"
                                    type="text"
                                    className="validate"
                                    name="numero"
                                    value={cliente.endereco.numero}
                                    onChange={handleChange}
                                />
                                <label htmlFor="numero">Número</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="bairro"
                                    type="text"
                                    className="validate"
                                    name="bairro"
                                    value={cliente.endereco.bairro}
                                    onChange={handleChange}
                                />
                                <label htmlFor="bairro">Bairro</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="cidade"
                                    type="text"
                                    className="validate"
                                    name="cidade"
                                    value={cliente.endereco.cidade}
                                    onChange={handleChange}
                                />
                                <label htmlFor="cidade">Cidade</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="estado"
                                    type="text"
                                    className="validate"
                                    name="estado"
                                    value={cliente.endereco.estado}
                                    onChange={handleChange}
                                />
                                <label htmlFor="estado">Estado</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="informacoesAdicionais"
                                    type="text"
                                    className="validate"
                                    name="informacoesAdicionais"
                                    value={cliente.endereco.informacoesAdicionais}
                                    onChange={handleChange}
                                />
                                <label htmlFor="informacoesAdicionais">Informações Adicionais</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="button" type="submit" name="action" disabled={isSubmitting}>Cadastrar
                                    <i className="material-icons right">send</i>
                                </button>
                                {mensagemSucesso && <p>{mensagemSucesso}</p>}
                            </div>
                        </div>
                        {mensagemErro && <p className="error-message">{mensagemErro}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioCadastroCliente;