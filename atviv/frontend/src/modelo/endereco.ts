export default class Endereco {
    public rua!: string;
    public numero!: string;
    public cidade: string;
    public estado: string;
    public cep!: string;

    constructor(cidade:string, estado:string) {
        this.cidade = cidade
        this.estado = estado
    }
}