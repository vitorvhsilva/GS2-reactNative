import React, { createContext, useContext, useEffect, useState } from "react";
import {
  usuarioService,
  UsuarioLogin,
  UsuarioCadastro,
  UsuarioResponse,
} from "../services/usuarioService";

export interface AuthContextData {
  user: UsuarioResponse | null;
  loading: boolean;
  signIn: (login: UsuarioLogin) => Promise<void>;
  register: (data: UsuarioCadastro) => Promise<void>;
  signOut: () => Promise<void>;
  carregarUsuarioLogado: (login: UsuarioLogin) => Promise<void>;
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

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, register, signOut, carregarUsuarioLogado }}
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
