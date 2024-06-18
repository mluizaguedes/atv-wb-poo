export default class RG {
    private valor: string;
    private dataEmissao: Date;
    private uf: string;

    constructor(valor: string, dataEmissao: string, uf: string) {
        this.valor = valor;
        this.dataEmissao = this.parseData(dataEmissao);
        this.uf = uf;
    }

    private parseData(dataString: string): Date {
        const partesData = dataString.split('/');
        const dia = Number(partesData[0].valueOf()).valueOf();
        const mes = Number(partesData[1].valueOf()).valueOf();
        const ano = Number(partesData[2].valueOf()).valueOf();
        return new Date(ano, mes, dia);
    }

    public getValor(): string {
        return this.valor;
    }

    public getDataEmissao(): Date {
        return this.dataEmissao;
    }

    public getUF(): string {
        return this.uf;
    }
}