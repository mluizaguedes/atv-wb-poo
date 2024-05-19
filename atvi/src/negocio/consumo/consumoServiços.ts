import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Servico from "../../modelo/servico";
import Consumo from "./consumo";

export default class ConsumoServiço extends Consumo{
    private clientes: Array<Cliente>;
    private serviços: Array<Servico>;
    private entrada: Entrada

    constructor(clientes: Array<Cliente>, serviços: Array<Servico>) {
        super()
        this.clientes = clientes
        this.serviços = serviços
        this.entrada = new Entrada()
    }
    
    public registrar(): void {
        console.log(`\nRegistrar servio adquirido`);

        let cpfInput = this.entrada.receberTexto(`Por favor, informe o CPF do cliente que adquiriu o serviço: `);
        let clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor() === cpfInput);

        if (clienteExistente) {
            let serviçoNome = this.entrada.receberTexto(`Nome do serviço adquirido: `);
            let serviçoExistente = this.serviços.find(serviço => serviço.nome === serviçoNome);

            if (serviçoExistente) {
                clienteExistente.adicionarServicoConsumido(serviçoExistente);
                console.log(`Serviço "${serviçoNome}" registrado para o cliente com CPF ${cpfInput}.\n`);
            } else {
                console.log(`Serviço "${serviçoNome}" não encontrado.`);
            }
        } else {
            console.log(`Cliente com CPF ${cpfInput} não encontrado.`);
        }
        console.log(`\n`);

    }
}