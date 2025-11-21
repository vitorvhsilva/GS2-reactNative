export interface ConteudoTrilha {
    idConteudoTrilha: string;
    nomeConteudoTrilha: string;
    tipoConteudoTrilha: string;
    conteudoTrilhaConcluida: boolean;
}

export interface ConteudosTrilhaResponse {
    trilhaConcluida: boolean;
    conteudos: ConteudoTrilha[];
}
