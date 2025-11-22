import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await signIn({ emailUsuario: email, senhaUsuario: senha });
            navigation.navigate("Home");
        } catch (err: any) {
            setError("Email ou senha inválidos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <SkillShiftLogo source={require("../../assets/skillshift.png")} />
            <LoginArea>
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                {error !== "" && <ErrorText>{error}</ErrorText>}

                <LoginButton disabled={loading} onPress={handleLogin}>
                    <LoginButtonText>
                        {loading ? "Entrando..." : "Entrar"}
                    </LoginButtonText>
                </LoginButton>

                <LoginNavigationText onPress={() => navigation.navigate("Cadastro")}>
                    Ainda não possui uma conta? Cadastre-se
                </LoginNavigationText>
            </LoginArea>
        </PageContainer>
    );
};

const PageContainer = styled.View`
    flex: 1;
    background-color: ${theme.colors.branco};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const SkillShiftLogo = styled.Image`
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
`;

const LoginArea = styled.View`
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

const LoginButton = styled.TouchableOpacity<{ disabled?: boolean }>`
    width: 100%;
    height: 50px;
    background-color: ${theme.colors.azulEscuro};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`;

const LoginButtonText = styled.Text`
    color: ${theme.colors.branco};
    font-family: ${theme.fonts.bold};
    font-size: ${theme.typography.title.fontSize}px;
`;

const LoginNavigationText = styled.Text`
    margin-top: 20px;
    font-size: ${theme.typography.subtitle.fontSize}px;
    color: ${theme.colors.azulEscuro};
    font-family: ${theme.fonts.regular};
`;

const ErrorText = styled.Text`
    color: red;
    font-family: ${theme.fonts.regular};
    margin-bottom: 10px;
`;
