import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Delete from "./delete";

export default class DeleteProduto extends Delete {
    private produtos: Array<Produto>;
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public deletar(): void {
        console.log(`\nDeletar produto`);
        let nomeInput = this.entrada.receberTexto(`Por favor informe o produto que deseja atualizar: `);
        let produtoExistente = this.produtos.find(produto => produto.nome === nomeInput);

        if (produtoExistente) {
            const index = this.produtos.findIndex(produto => produto.nome === nomeInput);
            this.produtos.splice(index, 1);
            console.log(`Produto deletado.`);
        } else {
            console.log(`Produto "${nomeInput}" não encontrado.`);
        }
    }
}
