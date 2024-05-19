import CPF from "./cpf";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
  public nome: string;
  public nomeSocial: string;
  public genero: string;
  private cpf: CPF;
  private rgs: Array<RG>;
  private dataCadastro: string;
  private telefones: Array<Telefone>;
  private produtosConsumidos: Array<Produto>;
  private servicosConsumidos: Array<Servico>;

  constructor(
    nome: string,
    nomeSocial: string,
    genero: string,
    cpf: CPF,
    rgs: Array<RG>,
    dataCadastro: string,
    telefones: Array<Telefone>
  ) {
    this.nome = nome;
    this.nomeSocial = nomeSocial;
    this.genero = genero;
    this.cpf = cpf;
    this.rgs = rgs;
    this.dataCadastro = dataCadastro;
    this.telefones = telefones;
    this.produtosConsumidos = [];
    this.servicosConsumidos = [];
  }

  public get getCpf(): CPF {
    return this.cpf;
  }
  public get getRgs(): Array<RG> {
    return this.rgs;
  }
  public get getDataCadastro(): string {
    return this.dataCadastro;
  }
  public get getTelefones(): Array<Telefone> {
    return this.telefones;
  }
  public get getProdutosConsumidos(): Array<Produto> {
    return this.produtosConsumidos;
  }
  public get getServicosConsumidos(): Array<Servico> {
    return this.servicosConsumidos;
  }

  public adicionarProdutoConsumido(produto: Produto): void {
    this.produtosConsumidos.push(produto);
  }

  public adicionarServicoConsumido(servico: Servico): void {
    this.servicosConsumidos.push(servico);
  }

  public quantidadeProdutosConsumidos(): number {
    return this.produtosConsumidos.length;
  }

  public quantidadeServiçosConsumidos(): number {
    return this.servicosConsumidos.length;
  }

  public quantidadeConsumo(): number {
    return this.quantidadeProdutosConsumidos() + this.quantidadeServiçosConsumidos();
  }
}
