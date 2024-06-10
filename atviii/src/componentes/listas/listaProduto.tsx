/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type Props = {
    tema: string
}

type Produto = {
    id: number;
    nome: string;
    valor: string;
};

const ListaProduto: React.FC<Props> = ({ tema }) => {
    const [produtos, setProdutos] = useState<Produto[]>([

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
    ]);

    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [editando, setEditando] = useState(false);
    const [produtoEditado, setProdutoEditado] = useState<Produto | null>(null);

    const produtoSelecionadoHandler = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setEditando(false);
        setProdutoEditado(produto);
    };

    const fechar = () => {
        setProdutoSelecionado(null);
    };

    const editar = () => {
        setEditando(true);
    };

    const excluir = () => {
        if (produtoSelecionado) {
            const novoArrayProduto = produtos.filter(produto => produto.id !== produtoSelecionado.id);
            setProdutos(novoArrayProduto);
            setProdutoSelecionado(null);
        }
    };

    const salvar = () => {
        if (produtoSelecionado && produtoEditado) {
            const index = produtos.findIndex(produto => produto.id === produtoSelecionado.id);
            if (index !== -1) {
                const novosProdutos = [...produtos];
                novosProdutos[index] = produtoEditado;
                setProdutos(novosProdutos);
                setProdutoSelecionado(produtoEditado);
                setEditando(false);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProdutoEditado(prevProdutoEditado => ({
            ...prevProdutoEditado!,
            [name]: value
        }));
    };

    let estilo = `collection-item active ${tema}`;

    return (
        <div>
            <h3 className="page-title"> World Beauty </h3>
            <div>
                <h4>Produtos</h4>
                <div className="left">
                    <div className="collection">
                        {produtos.map((produto) => (
                            <a
                                key={produto.nome}
                                className="collection-item"
                                onClick={() => produtoSelecionadoHandler(produto)}
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
                            <button onClick={fechar} className="btn">Fechar</button>
                            <button onClick={editar} className="btn">Editar</button>
                            <button onClick={excluir} className="btn red">Excluir Produto</button>
                        </div>
                    )}

                    {produtoSelecionado && editando && (
                        <div className={estilo}>
                            <h3>Editar Produto</h3>
                            <div className="input-field">
                                <input type="text" name="nome" value={produtoEditado!.nome} onChange={handleChange} />
                                <label className="active">Nome</label>
                            </div>
                            <div className="input-field">
                                <input type="text" name="valor" value={produtoEditado!.valor} onChange={handleChange} />
                                <label className="active">Preço</label>
                            </div>
                            <button onClick={salvar} className="btn">Salvar</button>
                            <button onClick={fechar} className="btn">Fechar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ListaProduto;