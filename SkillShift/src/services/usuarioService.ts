import AsyncStorage from "@react-native-async-storage/async-storage";
import { USUARIOS_API } from "./contants";

export interface UsuarioLogin {
  emailUsuario: string;
  senhaUsuario: string;
}

export interface UsuarioCadastro {
  emailUsuario: string;
  nomeUsuario: string;
  senhaUsuario: string;
  dia: number;
  mes: number;
  ano: number;
  cepUsuario: string;
}

export interface UsuarioResponse {
  idUsuario: string;
  emailUsuario: string;
  nomeUsuario: string;
  dataNascimentoUsuario: string;
  localizacao?: {
    cep: string;
    logradouro: string;
    estado: string;
  } | null;
}

export interface QuestionAnswer {
  question_id: number;
  resposta: string;
}

export interface CareerResponse {
  descricao: string;
  motivacao: string;
  nome_profissao: string;
  habilidades_principais: string[];
  tecnologias_relacionadas: string[];
  trilha_de_aprendizado: string[];
}

export const usuarioService = {
  login: async (data: UsuarioLogin): Promise<{ accessToken: string; idUsuario: string }> => {
    const response = await fetch(`${USUARIOS_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Falha no login");
    }

    return response.json();
  },

  cadastrar: async (data: UsuarioCadastro): Promise<UsuarioResponse> => {
    const response = await fetch(`${USUARIOS_API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar");
    }

    return response.json();
  },

  buscarUsuarioEspecifico: async (
    idUsuario: string,
    login: UsuarioLogin
  ): Promise<UsuarioResponse> => {
    const { accessToken } = await usuarioService.login(login);

    const response = await fetch(`${USUARIOS_API}/users/${idUsuario}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return response.json();
  },

  updateUsuario: async (
    idUsuario: string,
    login: UsuarioLogin,
    data: {
      nomeUsuario: string;
      senhaUsuario: string;
      dia: number;
      mes: number;
      ano: number;
    }
  ): Promise<void> => {
    const { accessToken } = await usuarioService.login(login);

    const response = await fetch(`${USUARIOS_API}/users/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }
  },


  storeUserId: async (id: string) => {
    await AsyncStorage.setItem("idUsuario", id);
  },

  getStoredUserId: async (): Promise<string | null> => {
    return AsyncStorage.getItem("idUsuario");
  },

  logout: async () => {
    await AsyncStorage.removeItem("idUsuario");
  },

  getUserCareer: async (idUsuario: string, token: string) => {
    const response = await fetch(`${USUARIOS_API}/users/${idUsuario}/career`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao buscar carreira do usuário");
    return response.json() as Promise<{ idUsuario: string; nomeProfissao: string | null }>;
  },

  createCareer: async (idUsuario: string, token: string, answers: QuestionAnswer[]) => {
    const response = await fetch(`${USUARIOS_API}/users/${idUsuario}/career`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) throw new Error("Erro ao criar carreira do usuário");
    return response.json() as Promise<CareerResponse>;
  },
};
