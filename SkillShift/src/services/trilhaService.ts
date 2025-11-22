import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConteudosTrilhaResponse } from "../types/conteudosTrilha";
import { ConteudoEspecificoResponse } from "../types/conteudoTrilha";
import { PaginacaoResponse } from "../types/trilha";
import { TRILHAS_API, TRILHAS_API_KEY } from "./contants";

export class TrilhaService {

    private static async getUserId(): Promise<string> {
        const id = await AsyncStorage.getItem("idUsuario");
        if (!id) {
            throw new Error("ID do usuário não encontrado no storage.");
        }
        return id;
    }

    static async listarTrilhas(pagina: number): Promise<PaginacaoResponse> {
        const userId = await this.getUserId();

        const response = await fetch(
            `${TRILHAS_API}/api/v1/usuarios/${userId}/trilhas?Pagina=${pagina}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TRILHAS_API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar trilhas");
        }

        return response.json();
    }

    static async listarConteudosDaTrilha(idTrilha: string): Promise<ConteudosTrilhaResponse> {
        const userId = await this.getUserId();

        const response = await fetch(
            `${TRILHAS_API}/api/v1/usuarios/${userId}/trilhas/${idTrilha}/conteudos`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TRILHAS_API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar conteúdos da trilha");
        }

        const json = await response.json();
        return json.data;
    }

    static async buscarConteudoEspecifico(idTrilha: string, idConteudo: string) {
        const userId = await this.getUserId();

        const response = await fetch(
            `${TRILHAS_API}/api/v1/usuarios/${userId}/trilhas/${idTrilha}/conteudos/${idConteudo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TRILHAS_API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar conteúdo específico da trilha");
        }

        const json = await response.json();
        return json.data;
    }

    static async marcarConteudoComoConcluido(idTrilha: string, idConteudo: string): Promise<void> {
        const userId = await this.getUserId();

        const response = await fetch(
            `${TRILHAS_API}/api/v1/usuarios/${userId}/trilhas/${idTrilha}/conteudos/${idConteudo}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": TRILHAS_API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao marcar conteúdo como concluído");
        }
    }
}
