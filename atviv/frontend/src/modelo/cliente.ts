import Endereco from "./endereco";

export interface Cliente {
    id?: number;
    nome: string;
    sobreNome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    email: string;
    dataCadastro: string;
    endereco: Endereco;
    telefones: string[];
    produtosConsumidos: string[];
    servicosConsumidos: string[];
};