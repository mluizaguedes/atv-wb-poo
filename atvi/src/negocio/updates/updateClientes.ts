import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import Update from "./update";

export default class UpdateClientes extends Update {
    private clientes: Array<Cliente>;
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public atualizar(): void {
        console.log(`\nAtualizar cliente`);

        let cpfInput = this.entrada.receberTexto(`Por favor informe o CPF do cliente que deseja atualizar: `);
        let clienteExistente = this.clientes.find(cliente => cliente.getCpf.getValor() === cpfInput);

        if (clienteExistente) {
            let nome = this.entrada.receberTexto(`Novo nome do cliente (${clienteExistente.nome}): `) || clienteExistente.nome;
            let nomeSocial = this.entrada.receberTexto(`Novo nome social do cliente (${clienteExistente.nomeSocial}): `) || clienteExistente.nomeSocial;
            let genero = this.entrada.receberTexto(`Gênero do cliente (${clienteExistente.genero}): `) || clienteExistente.genero;

            clienteExistente.nome = nome;
            clienteExistente.nomeSocial = nomeSocial;
            clienteExistente.genero = genero;

            if (clienteExistente.getRgs.length > 0) {
                let addMoreRG = this.entrada.receberTexto(`O cliente já possui RG cadastrado. Deseja adicionar mais um? (s/n): `);
                if (addMoreRG.toLowerCase() === 's') {
                    let valorRG = this.entrada.receberTexto(`Por favor informe o número do RG: `);
                    let dataRG = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
                    let ufRG = this.entrada.receberTexto(`Por favor informe a UF do RG: `);
                    let novoRG = new RG(valorRG, dataRG, ufRG);

                    clienteExistente.getRgs.push(novoRG);
                    console.log(`Novo RG adicionado com sucesso.`);
                }
            }

            if (clienteExistente.getTelefones.length > 0) {
                let addMoreTelefone = this.entrada.receberTexto(`O cliente já possui telefone(s) cadastrado(s). Deseja adicionar mais um? (s/n): `);
                if (addMoreTelefone.toLowerCase() === 's') {
                    let ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                    let numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                    let novoTelefone = new Telefone(ddd, numero);

                    clienteExistente.getTelefones.push(novoTelefone);
                    console.log(`Novo telefone adicionado com sucesso.`);
                }
            }

        console.log(`\nCliente atualizado com sucesso :)\n`);
        } else {
            console.log(`\nCliente com CPF ${cpfInput} não encontrado.`);
        }
        console.log(`\n`);
    }
}
