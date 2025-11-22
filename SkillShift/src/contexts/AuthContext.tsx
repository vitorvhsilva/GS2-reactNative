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
    carregarUsuarioLogado: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UsuarioResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarUsuarioLogado();
    }, []);

    const carregarUsuarioLogado = async () => {
        try {
            setLoading(true);

            const token = await usuarioService.getStoredToken();
            const idUsuario = await usuarioService.getStoredUserId();

            if (token && idUsuario) {
                const usuario = await usuarioService.buscarUsuarioEspecifico(idUsuario, token);
                setUser(usuario);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário logado:", error);
            await signOut();
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (login: UsuarioLogin) => {
        try {
            const { accessToken, idUsuario } = await usuarioService.login(login);

            await usuarioService.storeToken(accessToken);
            await usuarioService.storeUserId(idUsuario);

            const usuario = await usuarioService.buscarUsuarioEspecifico(idUsuario, accessToken);

            setUser(usuario);
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    };

    const register = async (data: UsuarioCadastro) => {
        try {
            const usuario = await usuarioService.cadastrar(data);

            await usuarioService.storeUserId(usuario.idUsuario);

            setUser(usuario);
        } catch (error) {
            console.error("Erro no cadastro:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await usuarioService.logout();
            setUser(null);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
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
