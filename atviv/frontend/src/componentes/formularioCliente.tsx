import React, { useState } from "react";

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
                            <label htmlFor="nome">Nome completo</label>
                        </div>
                    </div>
                    {/* Add other fields here similar to the 'nome' field */}
                    <div className="row">
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
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action" disabled={isSubmitting}>Cadastrar
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
