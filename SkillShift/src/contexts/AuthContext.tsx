import React, { createContext, useContext, useEffect, useState } from "react";
import {
  usuarioService,
  UsuarioLogin,
  UsuarioCadastro,
  UsuarioResponse,
  QuestionAnswer,
  CareerResponse,
} from "../services/usuarioService";

export interface AuthContextData {
  user: UsuarioResponse | null;
  loading: boolean;
  signIn: (login: UsuarioLogin) => Promise<void>;
  register: (data: UsuarioCadastro) => Promise<void>;
  signOut: () => Promise<void>;
  carregarUsuarioLogado: (login: UsuarioLogin) => Promise<void>;
  updateUser: (
    login: UsuarioLogin,
    data: {
      nomeUsuario: string;
      senhaUsuario: string;
      dia: number;
      mes: number;
      ano: number;
    }
  ) => Promise<void>;
  getUserCareer: (login: UsuarioLogin) => Promise<{ nomeProfissao: string | null }>;
  createCareer: (login: UsuarioLogin, answers: QuestionAnswer[]) => Promise<CareerResponse>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarUsuarioLogado = async (login: UsuarioLogin) => {
    try {
      setLoading(true);
      const idUsuario = await usuarioService.getStoredUserId();
      if (idUsuario) {
        const usuario = await usuarioService.buscarUsuarioEspecifico(idUsuario, login);
        setUser(usuario);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const inicializar = async () => {
      await carregarUsuarioLogado({
        emailUsuario: "",
        senhaUsuario: ""
      });
    };
    inicializar();
  }, []);

  const signIn = async (login: UsuarioLogin) => {
    setLoading(true);
    try {
      const { idUsuario } = await usuarioService.login(login);
      await usuarioService.storeUserId(idUsuario);
      const usuario = await usuarioService.buscarUsuarioEspecifico(idUsuario, login);
      setUser(usuario);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: UsuarioCadastro) => {
    setLoading(true);
    try {
      const usuario = await usuarioService.cadastrar(data);
      await usuarioService.storeUserId(usuario.idUsuario);
      setUser(usuario);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await usuarioService.logout();
    setUser(null);
  };

  const updateUser = async (
    login: UsuarioLogin,
    data: {
      nomeUsuario: string;
      senhaUsuario: string;
      dia: number;
      mes: number;
      ano: number;
    }
  ) => {
    if (!user) return;

    setLoading(true);

    try {
      await usuarioService.updateUsuario(user.idUsuario, login, data);

      const usuarioAtualizado = await usuarioService.buscarUsuarioEspecifico(
        user.idUsuario,
        login
      );

      setUser(usuarioAtualizado);
    } finally {
      setLoading(false);
    }
  };

  const getUserCareer = async (login: UsuarioLogin): Promise<{ nomeProfissao: string | null }> => {
    if (!user) throw new Error("Usuário não disponível");

    const { accessToken } = await usuarioService.login(login);

    return usuarioService.getUserCareer(user.idUsuario, accessToken);
  };

  const createCareer = async (login: UsuarioLogin, answers: QuestionAnswer[]): Promise<CareerResponse> => {
    if (!user) throw new Error("Usuário não disponível");

    const { accessToken } = await usuarioService.login(login);

    return usuarioService.createCareer(user.idUsuario, accessToken, answers);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, register, signOut, carregarUsuarioLogado, updateUser, getUserCareer, createCareer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
