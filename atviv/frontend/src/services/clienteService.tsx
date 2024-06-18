import { Cliente } from "../modelo/cliente";

export const getClientes = async (): Promise<Cliente[]> => {
    const response = await fetch('http://localhost:32832/clientes');
    return response.json();
};

export const getCliente = async (id: number): Promise<Cliente> => {
    const response = await fetch('http://localhost:32832/cliente/${id}');
    return response.json();
};

export const atualizarCliente = async (cliente: Cliente): Promise<void> => {
    await fetch('http://localhost:32832/cliente/atualizar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
};

export const cadastrarCliente = async (cliente: Cliente): Promise<void> => {
    await fetch('http://localhost:32832/cliente/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
};

export const excluirCliente = async (id: number): Promise<void> => {
    await fetch('http://localhost:32832/cliente/excluir', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
};
