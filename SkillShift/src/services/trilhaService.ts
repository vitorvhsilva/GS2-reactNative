import { Trilha } from "../types/trilha";
import { TRILHAS_API, TRILHAS_API_KEY } from "./contants";


export interface PaginacaoResponse {
    paginaAtual: number;
    tamanhoPagina: number;
    totalPaginas: number;
    totalItens: number;
    data: Trilha[];
}

export class TrilhaService {
    static async listarTrilhas(pagina: number): Promise<PaginacaoResponse> {
        const response = await fetch(`${TRILHAS_API}/api/v1/usuarios/5e5fc7b4-863d-4e8a-b0bb-c93a4360f972/trilhas?Pagina=${pagina}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": TRILHAS_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar trilhas");
        }

        return response.json();
    }
}
