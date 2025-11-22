import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";
import { UsuarioCadastro } from "../services/usuarioService";

type CadastroScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Cadastro">;
};

export const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    const { register } = useAuth();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cep, setCep] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDataChange = (text: string) => {
        let cleaned = text.replace(/\D/g, "");
        if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        if (cleaned.length > 5) cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
        setDataNascimento(cleaned);
    };

    const handleCadastro = async () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não conferem!");
            return;
        }

        const [dia, mes, ano] = dataNascimento.split("/").map(Number);
        const cadastroData: UsuarioCadastro = {
            nomeUsuario: nome,
            emailUsuario: email,
            senhaUsuario: senha,
            dia,
            mes,
            ano,
            cepUsuario: cep,
        };

        try {
            setLoading(true);
            await register(cadastroData);
            navigation.navigate("Home");
        } catch (error: any) {
            alert(error.message || "Erro ao cadastrar usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <SkillShiftLogo source={require("../../assets/skillshift.png")} />
            <CadastroArea>
                <Input placeholder="Nome" value={nome} onChangeText={setNome} />
                <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <Input placeholder="Senha" secureTextEntry={true} value={senha} onChangeText={setSenha} />
                <Input placeholder="Confirme a Senha" secureTextEntry={true} value={confirmarSenha} onChangeText={setConfirmarSenha} />
                <Input
                    placeholder="Nascimento (dd/mm/aaaa)"
                    keyboardType="numeric"
                    value={dataNascimento}
                    onChangeText={handleDataChange}
                    maxLength={10}
                />
                <Input placeholder="CEP" value={cep} onChangeText={setCep} />

                <CadastroButton disabled={loading} onPress={handleCadastro}>
                    <CadastroButtonText>{loading ? "Cadastrando..." : "Cadastrar"}</CadastroButtonText>
                </CadastroButton>
                <CadastroNavigationText onPress={() => navigation.navigate("Login")}>
                    Já possui uma conta? Faça o Login
                </CadastroNavigationText>
            </CadastroArea>
        </PageContainer>
    );
};

const PageContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.branco};
  justify-content: center;
  align-items: center;
`;

const SkillShiftLogo = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
`;

const CadastroArea = styled.View`
  width: 80%;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid ${theme.colors.cinza};
  border-radius: 8px;
  padding: 0 15px;
  margin-bottom: 20px;
  font-size: ${theme.typography.title.fontSize}px;
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.preto};
`;

const CadastroButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 100%;
  height: 50px;
  background-color: ${(p) => (p.disabled ? theme.colors.cinza : theme.colors.azulEscuro)};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`;

const CadastroButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.typography.title.fontSize}px;
`;

const CadastroNavigationText = styled.Text`
  margin-top: 20px;
  font-size: ${theme.typography.subtitle.fontSize}px;
  color: ${theme.colors.azulEscuro};
  font-family: ${theme.fonts.regular};
`;
