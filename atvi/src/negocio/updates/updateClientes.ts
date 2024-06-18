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

    private listarTelefones(cliente: Cliente): void {
        console.log(`\nTelefones do cliente:`);
        cliente.getTelefones.forEach((telefone, index) => {
            console.log(`${index} - (${telefone.ddd}) ${telefone.numero}`);
        });
    }
    private listarRGs(cliente: Cliente): void {
        console.log(`\nRG(s) do cliente:`);
        cliente.getRgs.forEach((RG, index) => {
            console.log(`${index} - ${RG.valor}/${RG.uf}`);
        });
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
                let addMoreRG = this.entrada.receberTexto(`O cliente já possui RG(s) cadastrado. Deseja adicionar mais um? (s/n): `);
                if (addMoreRG.toLowerCase() === 's') {
                    let valorRG = this.entrada.receberTexto(`Por favor informe o número do RG: `);
                    let dataRG = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
                    let ufRG = this.entrada.receberTexto(`Por favor informe a UF do RG: `);
                    let novoRG = new RG(valorRG, dataRG, ufRG);

                    clienteExistente.getRgs.push(novoRG);
                    console.log(`Novo RG adicionado com sucesso.`);
                }

                let excluirRG = this.entrada.receberTexto(`O cliente já possui RG(s) cadastrado. Deseja excluir algum? (s/n): `);
                if (excluirRG.toLowerCase() === 's') {
                    let continuarExcluindo = true;
                    while (continuarExcluindo) {
                        this.listarRGs(clienteExistente);
                        let indiceRG = parseInt(this.entrada.receberTexto(`Informe o índice do RG que deseja excluir: `));
                        if (indiceRG >= 0 && indiceRG < clienteExistente.getRgs.length) {
                            clienteExistente.getRgs.splice(indiceRG, 1);
                            console.log(`RG excluído com sucesso.`);
                        } else {
                            console.log(`Índice inválido.`);
                        }
                        continuarExcluindo = this.entrada.receberTexto(`Deseja excluir outro RG? (s/n): `).toLowerCase() === 's';
                    }
                }
            }

            if (clienteExistente.getTelefones.length > 0) {

                let editTelefone = this.entrada.receberTexto(`O cliente possui telefone(s) cadastrado(s). Deseja EDITAR algum? (s/n): `);
                if (editTelefone.toLowerCase() === 's') {
                    let continuarEditando = true;
                    while (continuarEditando) {
                        this.listarTelefones(clienteExistente);
                        let indiceTelefone = parseInt(this.entrada.receberTexto(`Informe o índice do telefone que deseja editar: `));
                        if (indiceTelefone >= 0 && indiceTelefone < clienteExistente.getTelefones.length) {
                            let telefone = clienteExistente.getTelefones[indiceTelefone];
                            let novoDDD = this.entrada.receberTexto(`Novo DDD do telefone (${telefone.ddd}): `) || telefone.ddd;
                            let novoNumero = this.entrada.receberTexto(`Novo número do telefone (${telefone.numero}): `) || telefone.numero;
                            telefone.ddd = novoDDD;
                            telefone.numero = novoNumero;
                            console.log(`Telefone atualizado com sucesso.`);
                        } else {
                            console.log(`Índice inválido.`);
                        }
                        continuarEditando = this.entrada.receberTexto(`Deseja EDITAR outro telefone? (s/n): `).toLowerCase() === 's';
                    }
                }

            }
            let addMoreTelefone = this.entrada.receberTexto(`Deseja ADICIONAR um número de telefone? (s/n): `);
            if (addMoreTelefone.toLowerCase() === 's') {
                let ddd = this.entrada.receberTexto(`Por favor informe o DDD do telefone: `);
                let numero = this.entrada.receberTexto(`Por favor informe o número do telefone: `);
                let novoTelefone = new Telefone(ddd, numero);

                clienteExistente.getTelefones.push(novoTelefone);
                console.log(`Novo telefone adicionado com sucesso.`);
            }

        console.log(`\nCliente atualizado com sucesso :)\n`);
        } else {
            console.log(`\nCliente com CPF ${cpfInput} não encontrado.`);
        }
        console.log(`\n`);
    }
}
