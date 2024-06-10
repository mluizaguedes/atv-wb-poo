/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    tema: string
}

type Produto = {
    id: number;
    nome: string;
    valor: string;
};

type State = {
    produtoSelecionado: Produto | null;
    editando: boolean;
    produtoEditado: Produto | null;
};

export default class ListaProduto extends Component<props, State> {
    state: State = {
        produtoSelecionado: null,
        editando: false,
        produtoEditado: null
    };

    produtos: Produto[] = [
        { id: 1, nome: "Shampoo Profissional Antirresíduos", valor: "R$ 50,00" },
        { id: 2, nome: "Condicionador Hidratante", valor: "R$ 45,00" },
        { id: 3, nome: "Máscara de Tratamento Capilar", valor: "R$ 70,00" },
        { id: 4, nome: "Óleo de Argan", valor: "R$ 60,00" },
        { id: 5, nome: "Cera Modeladora para Barba e Bigode", valor: "R$ 40,00" },
        { id: 6, nome: "Gel Fixador para Cabelo", valor: "R$ 35,00" },
        { id: 7, nome: "Máquina de Corte Profissional", valor: "R$ 250,00" },
        { id: 8, nome: "Creme de Barbear", valor: "R$ 30,00" },
        { id: 9, nome: "Loção Pós-Barba", valor: "R$ 25,00" },
        { id: 10, nome: "Pente de Madeira para Barba", valor: "R$ 20,00" }
    ];

    produtoSelecionado = (produto: Produto) => {
        this.setState({ produtoSelecionado: produto, editando: false, produtoEditado: produto });
    };

    fechar = () => {
        this.setState({ produtoSelecionado: null });
    };

    editar = () => {
        this.setState({ editando: true });
    };

    excluir = () => {
        const { produtoSelecionado } = this.state;
        if (produtoSelecionado) {
            const novoArrayProdutos = this.produtos.filter(produto => produto.id !== produtoSelecionado.id);
            this.produtos = novoArrayProdutos;
            this.setState({ produtoSelecionado: null });
        }
    };

    salvar = () => {
        const { produtoSelecionado, produtoEditado } = this.state;
        if (produtoSelecionado && produtoEditado) {
            const index = this.produtos.findIndex(produto => produto.id === produtoSelecionado.id);
            if (index !== -1) {
                this.produtos[index] = produtoEditado;
                this.setState({ produtoSelecionado: produtoEditado, editando: false });
            }
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            produtoEditado: {
                ...prevState.produtoEditado!,
                [name]: value
            }
        }));
    };

    render() {
        const { produtoSelecionado, editando, produtoEditado } = this.state;
        let estilo = `collection-item active ${this.props.tema}`;

        return (
            <div>
                <h3 className="page-title"> World Beauty </h3>
                <div>
                    <h3>Produtos</h3>
                    <div className="left">
                        <div className="collection">
                            {this.produtos.map((produto) => (
                                <a
                                    key={produto.nome}
                                    className="collection-item"
                                    onClick={() => this.produtoSelecionado(produto)}
                                >
                                    {produto.nome}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="table.responsive-table">
                        {produtoSelecionado && !editando && (
                            <div className={estilo}>
                                <h3>{produtoSelecionado.nome}</h3>
                                <p><strong>ID do produto:</strong> {produtoSelecionado.id}</p>
                                <p><strong>Preço:</strong> {produtoSelecionado.valor}</p>
                                <button onClick={this.fechar} className="btn">Fechar</button>
                                <button onClick={this.editar} className="btn">Editar</button>
                                <button onClick={this.excluir} className="btn red">Excluir Produto</button>
                            </div>
                        )}

                        {produtoSelecionado && editando && (
                            <div className={estilo}>
                                <h3>Editar Produto</h3>
                                <div className="input-field">
                                    <input type="text" name="nome" value={produtoEditado!.nome} onChange={this.handleChange} />
                                    <label className="active">Nome</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="valor" value={produtoEditado!.valor} onChange={this.handleChange} />
                                    <label className="active">Preço</label>
                                </div>
                                <button onClick={this.salvar} className="btn">Salvar</button>
                                <button onClick={this.fechar} className="btn">Fechar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}