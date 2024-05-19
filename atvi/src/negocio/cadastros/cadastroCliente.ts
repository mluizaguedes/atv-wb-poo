import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import Cadastro from "./cadastro";

export default class CadastroCliente extends Cadastro {

    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        let dataCadastro = new Date().toLocaleDateString();
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let genero = this.entrada.receberTexto(`Por favor informe o gênero do cliente (F/M): `)
        
        let valorCPF = this.entrada.receberTexto(`Por favor informe o número do CPF: `);
        let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do CPF, no padrão dd/mm/yyyy: `);
        let cpf = new CPF(valorCPF, dataCPF);
        
        let rgs: Array<RG> = [];
        while (true) {
            let valorRG = this.entrada.receberTexto(`Por favor informe o número do RG: `);
            let dataRG = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
            let ufRG = this.entrada.receberTexto(`Por favor informe a UF do RG: `);
            let rg = new RG(valorRG, dataRG, ufRG);

            rgs.push(rg);

            let continueInput = this.entrada.receberTexto(`Deseja cadastrar outro RG? (s/n): `);
                if (continueInput.toLowerCase() !== 's') {
                    break;
                }
            }
        
        let telefones: Array<Telefone> = [];
        while (true) {
            let ddd = this.entrada.receberTexto(`Por favor o DDD: `);
            let numero = this.entrada.receberTexto(`Por favor informe o número de telefone: `);
            let telefone = new Telefone(ddd, numero);

            telefones.push(telefone);

            let continueInput = this.entrada.receberTexto(`Deseja cadastrar outro número de telefone? (s/n): `)
                if (continueInput.toLowerCase() !== 's') {
                    break;
                }
            }

        let cliente = new Cliente(nome, nomeSocial, genero, cpf, rgs, dataCadastro, telefones);

        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}