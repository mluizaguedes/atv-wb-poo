import { Cliente } from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private produtosMaisConsumidos: Map<string, number>;
    private servicosMaisConsumidos: Map<string, number>;

    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.produtosMaisConsumidos = new Map<string, number>();
        this.servicosMaisConsumidos = new Map<string, number>();
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }

    public registrarCompraProduto(produto: Produto, quantidade: number) {
        const totalAtual = this.produtosMaisConsumidos.get(produto.nome) || 0;
        this.produtosMaisConsumidos.set(produto.nome, totalAtual + quantidade);
    }

    public registrarServicoAdquirido(servico: Servico) {
        const totalAtual = this.servicosMaisConsumidos.get(servico.nome) || 0;
        this.servicosMaisConsumidos.set(servico.nome, totalAtual + 1);
    }

    public getProdutosMaisConsumidos(): Map<string, number> {
        return this.produtosMaisConsumidos;
    }

    public getServicosMaisConsumidos(): Map<string, number> {
        return this.servicosMaisConsumidos;
    }
}