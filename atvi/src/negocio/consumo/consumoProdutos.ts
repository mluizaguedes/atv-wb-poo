import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Consumo from "./consumo";

export default class ConsumoProduto extends Consumo{
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private entrada: Entrada

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    
    public registrar(): void {
        console.log(`\nRegistrar produto adquirido`);

        let cpfInput = this.entrada.receberTexto(`Por favor, informe o CPF do cliente que adquiriu o produto: `);
        let clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor() === cpfInput);

        if (clienteExistente) {
            let produtoNome = this.entrada.receberTexto(`Nome do produto adquirido: `);
            let produtoExistente = this.produtos.find(produto => produto.nome === produtoNome);

            if (produtoExistente) {
                clienteExistente.adicionarProdutoConsumido(produtoExistente);
                console.log(`Produto "${produtoNome}" registrado para o cliente com CPF ${cpfInput}.\n`);
            } else {
                console.log(`Produto "${produtoNome}" não encontrado.`);
            }
        } else {
            console.log(`Cliente com CPF ${cpfInput} não encontrado.`);
        }
        console.log(`\n`);
    }
}