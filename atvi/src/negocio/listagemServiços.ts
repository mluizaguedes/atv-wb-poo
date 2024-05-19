import Serviço from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServiços extends Listagem{
    private serviços: Array<Serviço>
    constructor(serviços: Array<Serviço>) {
        super()
        this.serviços = serviços
    }
    
    public listar(): void {
        console.log(`\nLista de todos os serviços:`);
        this.serviços.forEach(serviço => {
            console.log(`Nome: ` + serviço.nome);
            console.log(`Valor: ` + serviço.valor);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
    
}