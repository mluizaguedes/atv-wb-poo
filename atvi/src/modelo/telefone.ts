export default class Telefone {
    private _ddd: string
    private _numero: string
    constructor(ddd: string, numero: string) {
        this._ddd = ddd
        this._numero = numero
    }

    get ddd(): string {
        return this._ddd;
    }

    set ddd(value: string) {
        this._ddd = value;
    }

    get numero(): string {
        return this._numero;
    }

    set numero(value: string) {
        this._numero = value;
    }

    public get getDdd(): string {
        return this.ddd
    }

    public get getNumero(): string {
        return this.numero
    }
}