import Cliente from "../modelo/cliente";
import Classificacao from "./classificação";

export default class Classificar5ClientesMaisGastaram extends Classificacao {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  private calcularValorTotalGasto(cliente: Cliente): number {
    let valorTotal = 0;
    cliente.getProdutosConsumidos.forEach(produto => {
      valorTotal += produto.valor;
    });
    cliente.getServicosConsumidos.forEach(servico => {
      valorTotal += servico.valor;
    });
    return valorTotal;
  }

  public classificar(): void {
    console.log(`\nTop 5 clientes que mais consumiram em valor, não em quantidade:`);

    this.clientes.sort((a, b) => {
      const valorTotalA = this.calcularValorTotalGasto(a);
      const valorTotalB = this.calcularValorTotalGasto(b);
      return valorTotalB - valorTotalA;
    });

    for (let i = 0; i < 5 && i < this.clientes.length; i++) {
      const cliente = this.clientes[i];
      const valorTotalGasto = this.calcularValorTotalGasto(cliente);
      console.log(`${i + 1}. ${cliente.nome} - Valor total gasto: R$${valorTotalGasto}`);
    }

    console.log(`\n`);
  }
}
