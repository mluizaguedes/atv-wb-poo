import React, { useState } from "react";
import '../componentes.css';

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
    nome: string;
    sobreNome: string; 
    email: string; 
    endereco: Endereco;
    telefones: string[];
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [cliente, setCliente] = useState<Cliente>({
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Cliente | keyof Endereco) => {
        const { name, value } = event.target;
        
        if (field in cliente.endereco) {
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
        if (!cliente.nome || cliente.telefones.length === 0) {
            setMensagemErro('Todos os campos obrigatórios devem ser preenchidos.');
            setMensagemSucesso(null);
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Enviando dados do cliente:', JSON.stringify(cliente, null, 2));

            const response = await fetch('http://localhost:32832/cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                setMensagemSucesso('Cliente cadastrado com sucesso!');
                setMensagemErro(null);
                setCliente({
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
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>Cadastrar Cliente</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="nome"
                                type="text"
                                className="validate"
                                name="nome"
                                value={cliente.nome}
                                onChange={(e) => handleChange(e, 'nome')}
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
                                onChange={(e) => handleChange(e, 'sobreNome')}
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
                                onChange={(e) => handleChange(e, 'email')}
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
                                onChange={(e) => handleChange(e, 'codigoPostal')}
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
                                onChange={(e) => handleChange(e, 'rua')}
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
                                onChange={(e) => handleChange(e, 'numero')}
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
                                onChange={(e) => handleChange(e, 'bairro')}
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
                                onChange={(e) => handleChange(e, 'cidade')}
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
                                onChange={(e) => handleChange(e, 'estado')}
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
                                onChange={(e) => handleChange(e, 'informacoesAdicionais')}
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
                </form>
            </div>
        </div>
    );
}

export default FormularioCadastroCliente;