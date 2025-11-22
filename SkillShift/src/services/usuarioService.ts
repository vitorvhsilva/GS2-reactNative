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

  buscarUsuarioEspecifico: async (idUsuario: string, token: string): Promise<UsuarioResponse> => {
    const response = await fetch(`${USUARIOS_API}/users/${idUsuario}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return response.json();
  },

  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("idUsuario");
  },

  storeToken: async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
  },

  storeUserId: async (id: string) => {
    await AsyncStorage.setItem("idUsuario", id);
  },

  getStoredToken: async (): Promise<string | null> => {
    return AsyncStorage.getItem("accessToken");
  },

  getStoredUserId: async (): Promise<string | null> => {
    return AsyncStorage.getItem("idUsuario");
  },
};