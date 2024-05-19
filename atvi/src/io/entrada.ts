import promptSync from "prompt-sync"; //programa pausa a execução e aguardar a entrada do usuário antes de continuar.

export default class Entrada {

  public receberNumero(mensagem: string): number {

    // cria instância do prompt-sync
    let prompt = promptSync();

    // exibe a mensagem e recebe a entrada do usuário
    let valor = parseFloat(prompt(mensagem));

    let numero = new Number(valor);
    return numero.valueOf();
  }

  public receberTexto(mensagem: string): string {

    // cria instância do prompt-sync
    let prompt = promptSync();

    // exibe a mensagem e recebe a entrada do usuário
    let texto = prompt(mensagem);

    return texto;
  }
}
