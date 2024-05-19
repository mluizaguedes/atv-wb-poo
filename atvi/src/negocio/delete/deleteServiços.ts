import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Delete from "./delete";

export default class DeleteServiço extends Delete {
    private serviços: Array<Servico>;
    private entrada: Entrada
    constructor(serviços: Array<Servico>) {
        super()
        this.serviços = serviços
        this.entrada = new Entrada()
    }

    public deletar(): void {
        console.log(`\nDeletar serviço`);
        let nomeInput = this.entrada.receberTexto(`Por favor informe o serviço que deseja deletar: `);
        let produtoExistente = this.serviços.find(produto => produto.nome === nomeInput);

        if (produtoExistente) {
            const index = this.serviços.findIndex(produto => produto.nome === nomeInput);
            this.serviços.splice(index, 1);
            console.log(`Serviço deletado.`);
        } else {
            console.log(`Serviço cadastrado como ${nomeInput} não encontrado.`);
        }
    }
}
