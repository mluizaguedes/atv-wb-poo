export default class CPF {
    private valor: string;
    private dataEmissao: Date;

    constructor(valor: string, dataEmissao: string) {
        this.valor = valor;
        this.dataEmissao = this.parseData(dataEmissao);
    }

    parseData(data) {
        const partesData = data.split(',').map(part => part.trim());
        const dia = Number(partesData[0]);
        const mes = Number(partesData[1]) - 1; // Subtrai 1 porque os meses em JavaScript vão de 0 a 11
        const ano = Number(partesData[2]);
        return new Date(ano, mes, dia);
    }

    public getValor(): string {
        return this.valor;
    }

    public getDataEmissao(): Date {
        return this.dataEmissao;
    }
}
