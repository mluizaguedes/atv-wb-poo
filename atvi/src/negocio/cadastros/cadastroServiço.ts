import Entrada from "../../io/entrada";
import Cadastro from "./cadastro";
import Servico from "../../modelo/servico";

export default class CadastroServiço extends Cadastro{
    private serviços: Array<Servico>
    private entrada: Entrada
    constructor(serviços: Array<Servico>){
        super()
        this.serviços = serviços
        this.entrada = new Entrada()
    
    }
    public cadastrar(): void {
        console.log(`\nInicio do cadastro de um novo serviço`)
        
        let nomeServiço = this.entrada.receberTexto(`Digite o nome do novo serviço: `)
        let valorServiço = this.entrada.receberNumero(`Por favor informe o valor do serviço: `)

        let serviço = new Servico(nomeServiço, valorServiço)
        serviço.nome = nomeServiço
        serviço.valor = valorServiço
        this.serviços.push(serviço)
        
        console.log(`\nCadastro concluído :)\n`);
    }

}