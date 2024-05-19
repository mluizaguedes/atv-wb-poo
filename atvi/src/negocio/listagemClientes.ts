import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    const feminino = this.clientes.filter((cliente) => cliente.genero === "F");
    const masculino = this.clientes.filter((cliente) => cliente.genero === "M");

    console.log(`\nLista de clientes do sexo FEMININO`);
    feminino.forEach((cliente) => {
      console.log(`Data de cadastro: ` + cliente.getDataCadastro);
      console.log(`Nome: ` + cliente.nome);
      console.log(`Nome social: ` + cliente.nomeSocial);
      console.log(`Gênero: ` + cliente.genero)
      console.log(`CPF: ` + cliente.getCpf.getValor());
      console.log(
        `RG(s): ${cliente.getRgs
          .map((rg) => `${rg.getValor()} - ${rg.getUF()}`)
          .join(", ")}`
      );
      console.log(
        `Telefone(s): ${cliente.getTelefones
          .map((telefone) => `(${telefone.getDdd}) ${telefone.getNumero}`)
          .join(", ")}`
      );
      console.log(
        `Produtos adquiridos: ${
          cliente.getProdutosConsumidos.length > 0
            ? cliente.getProdutosConsumidos
                .map((produto) => produto.nome)
                .join(", ")
            : "Nenhum"
        }`
      );
      console.log(
        `Serviços adquiridos: ${
          cliente.getServicosConsumidos.length > 0
            ? cliente.getServicosConsumidos
                .map((servico) => servico.nome)
                .join(", ")
            : "Nenhum"
        }`
      );
      console.log(`--------------------------------------`);
    });
    console.log(`\n`);

    console.log(`\nLista de clientes do sexo MASCULINO`);
    masculino.forEach((cliente) => {
      console.log(`Data de cadastro: ` + cliente.getDataCadastro);
      console.log(`Nome: ` + cliente.nome);
      console.log(`Nome social: ` + cliente.nomeSocial);
      console.log(`Gênero: ` + cliente.genero)
      console.log(`CPF: ` + cliente.getCpf.getValor());
      console.log(
        `RG(s): ${cliente.getRgs
          .map((rg) => `${rg.getValor()} - ${rg.getUF()}`)
          .join(", ")}`
      );
      console.log(
        `Telefone(s): ${cliente.getTelefones
          .map((telefone) => `(${telefone.getDdd}) ${telefone.getNumero}`)
          .join(", ")}`
      );
      console.log(
        `Produtos adquiridos: ${
          cliente.getProdutosConsumidos.length > 0
            ? cliente.getProdutosConsumidos
                .map((produto) => produto.nome)
                .join(", ")
            : "Nenhum"
        }`
      );
      console.log(
        `Serviços adquiridos: ${
          cliente.getServicosConsumidos.length > 0
            ? cliente.getServicosConsumidos
                .map((servico) => servico.nome)
                .join(", ")
            : "Nenhum"
        }`
      );
      console.log(`--------------------------------------`);
    });
    console.log(`\n`);
  }
}
