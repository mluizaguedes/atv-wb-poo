import Classificacao from "./classificação";
import Cliente from "../modelo/cliente";

interface Item {
  nome: string;
  quantidade: number;
}

export default class ClassificarVendasGerais extends Classificacao {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public classificar(): void {
    console.log(`\nTop 10 produtos/serviços mais adquiridos:`);

    const consumptionMap: Map<string, number> = new Map();

    this.clientes.forEach(cliente => {
        cliente.getProdutosConsumidos.forEach(produto => {
          const currentQuantity = consumptionMap.get(produto.nome) || 0;
          consumptionMap.set(produto.nome, currentQuantity + 1);
        });
    });

    this.clientes.forEach(cliente => {
      cliente.getServicosConsumidos.forEach(servico => {
        const currentQuantity = consumptionMap.get(servico.nome) || 0;
        consumptionMap.set(servico.nome, currentQuantity + 1);
      });
    });

    const consumptionArray: Array<Item> = [];
    consumptionMap.forEach((quantity, nome) => {
      consumptionArray.push({ nome, quantidade: quantity });
    });

    consumptionArray.sort((a, b) => b.quantidade - a.quantidade);
  
    for (let i = 0; i < 10 && i < consumptionArray.length; i++) {
        console.log(`${i + 1}. ${consumptionArray[i].nome} - Quantidade de consumo: ${consumptionArray[i].quantidade}`);
    }

    console.log(`\n`);
  }
}
