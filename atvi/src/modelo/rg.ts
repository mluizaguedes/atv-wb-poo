export default class RG {
    private _valor: string;
    private dataEmissao: Date;
    private _uf: string;

    constructor(valor: string, dataEmissao: string, uf: string) {
        this._valor = valor;
        this.dataEmissao = this.parseData(dataEmissao);
        this._uf = uf;
    }

    parseData(data) {
        const partesData = data.split(',').map(part => part.trim());
        const dia = Number(partesData[0]);
        const mes = Number(partesData[1]) - 1; // Subtrai 1 porque os meses em JavaScript vão de 0 a 11
        const ano = Number(partesData[2]);
        return new Date(ano, mes, dia);
    }

    get valor(): string {
        return this._valor;
    }

    set valor(value: string) {
        this._valor = value;
    }

    get uf(): string {
        return this._uf;
    }

    set uf(value: string) {
        this._uf = value;
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