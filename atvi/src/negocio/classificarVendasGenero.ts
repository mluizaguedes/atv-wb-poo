import Classificacao from "./classificação";
import Cliente from "../modelo/cliente";

interface Item {
  nome: string;
  quantidade: number;
}

export default class ClassificarVendasGenero extends Classificacao {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public classificar(): void {
    console.log(`\nTop produtos/serviços mais consumidos pelos clientes de cada gênero:`);
    console.log(`\n--------------------------------------------------------------------`);

    const feminino = this.clientes.filter(cliente => cliente.genero === "F");
    const masculino = this.clientes.filter(cliente => cliente.genero === "M");

    const consumoFemininoMap: Map<string, number> = this.consumo(feminino);
    const consumoMasculinoMap: Map<string, number> = this.consumo(masculino);

    const listaConsumoFeminino: Array<Item> = this.convertMapToArray(consumoFemininoMap);
    const listaConsumoMasculinoMap: Array<Item> = this.convertMapToArray(consumoMasculinoMap);

    this.top5Consumo(listaConsumoFeminino, "Feminino");
    this.top5Consumo(listaConsumoMasculinoMap, "Masculino");
  }

  private consumo(clientes: Array<Cliente>): Map<string, number> {
    const consumoMap: Map<string, number> = new Map();

    clientes.forEach(cliente => {
      cliente.getProdutosConsumidos.forEach(produto => {
        const currentQuantity = consumoMap.get(produto.nome) || 0;
        consumoMap.set(produto.nome, currentQuantity + 1);
      });

      cliente.getServicosConsumidos.forEach(servico => {
        const currentQuantity = consumoMap.get(servico.nome) || 0;
        consumoMap.set(servico.nome, currentQuantity + 1);
      });
    });

    return consumoMap;
  }

  private convertMapToArray(consumoMap: Map<string, number>): Array<Item> {
    const consumoArray: Array<Item> = [];
    consumoMap.forEach((quantidade, nome) => {
        consumoArray.push({ nome, quantidade });
    });
    consumoArray.sort((a, b) => b.quantidade - a.quantidade);
    return consumoArray;
  }

  private top5Consumo(items: Array<Item>, gender: string): void {
    console.log(`\n${gender}:`);
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.nome} - Quantidade de consumo: ${item.quantidade}`);
    });
  }
}
