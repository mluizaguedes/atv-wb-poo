import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Delete from "./delete";

export default class DeleteCliente extends Delete {
    private clientes: Array<Cliente>;
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public deletar(): void {
        console.log(`\nDeletar cliente`);
        let cpfInput = this.entrada.receberTexto(`Por favor informe o CPF do cliente que deseja deletar: `);
        let clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor() === cpfInput);

        if (clienteExistente) {
            const index = this.clientes.findIndex(cliente => cliente.getCpf.getValor() === cpfInput);
            this.clientes.splice(index, 1);
            console.log(`Cliente com CPF ${cpfInput} deletado.`);
        } else {
            console.log(`Cliente com CPF ${cpfInput} não encontrado.`);
        }
    }
}
