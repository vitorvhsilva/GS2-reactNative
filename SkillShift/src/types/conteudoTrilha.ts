export interface ConteudoEspecifico {
    idConteudoTrilha: string;
    nomeConteudoTrilha: string;
    tipoConteudoTrilha: string;
    textoConteudoTrilha: string;
    conteudoTrilhaConcluida: boolean;
}

export interface ConteudoEspecificoResponse {
    data: ConteudoEspecifico;
}
