import Cliente from "../modelo/cliente";
import Classificacao from "./classificação";

export default class Classificar10ClientesMaisConsumiram extends Classificacao {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public classificar(): void {
    console.log(`\nTop 10 clientes que consumiram mais produtos ou serviços:`);

    this.clientes.sort((a, b) => b.quantidadeConsumo() - a.quantidadeConsumo());
    for (let i = 0; i < 10 && i < this.clientes.length; i++) {
        console.log(`${i + 1}. ${this.clientes[i].nome} - Quantidade de consumo: ${this.clientes[i].quantidadeConsumo()}`);
    }
    console.log(`\n`);
  }
}
