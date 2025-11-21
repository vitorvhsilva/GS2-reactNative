
export interface Trilha {
    idTrilha: string;
    nomeTrilha: string;
    quantidadeConteudosTrilha: number;
    trilhaCompletada: boolean;
}

export interface PaginacaoResponse {
    paginaAtual: number;
    tamanhoPagina: number;
    totalPaginas: number;
    totalItens: number;
    data: Trilha[];
}