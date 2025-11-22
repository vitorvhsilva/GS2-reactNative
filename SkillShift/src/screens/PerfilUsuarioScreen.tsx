import React, { useState } from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";
import { FooterNavigation } from "../components/FooterNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type PerfilUsuarioScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "PerfilUsuario">;
};

export const PerfilUsuarioScreen: React.FC<PerfilUsuarioScreenProps> = () => {
    const { user } = useAuth();

    const [editando, setEditando] = useState(false);

    const [nome, setNome] = useState(user?.nomeUsuario || "");
    const [email, setEmail] = useState(user?.emailUsuario || "");
    const [dataNasc, setDataNasc] = useState(user?.dataNascimentoUsuario || "");
    const [senha, setSenha] = useState("******");

    const salvarAlteracoes = () => {
        setEditando(false);
        console.log("Enviar atualização para API:", {
            nome,
            email,
            dataNasc,
            senha,
        });
    };

    return (
        <PageContainer>

            <Content>
                <Avatar source={require("../../assets/navegacao/perfil_cinza.png")} />

                <Card>
                    <Label>Nome</Label>
                    <Input editable={editando} value={nome} onChangeText={setNome} $locked={!editando} />

                    <Label>Email</Label>
                    <Input editable={editando} value={email} onChangeText={setEmail} $locked={!editando} />

                    <Label>Data de nascimento</Label>
                    <Input editable={editando} value={dataNasc} onChangeText={setDataNasc} $locked={!editando} />

                    <Label>Senha</Label>
                    <Input editable={editando} secureTextEntry value={senha} onChangeText={setSenha} $locked={!editando} />

                    {!editando ? (
                        <ButtonEditar onPress={() => setEditando(true)}>
                            <ButtonText>Editar</ButtonText>
                        </ButtonEditar>
                    ) : (
                        <ButtonSalvar onPress={salvarAlteracoes}>
                            <ButtonText>Salvar</ButtonText>
                        </ButtonSalvar>
                    )}
                </Card>
            </Content>

            <FooterNavigation active="perfil" />
        </PageContainer>
    );
};

const PageContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.branco};
  justify-content: space-between;
`;

const Content = styled.View`
  align-items: center;
  padding-top: 40px;
`;

const Avatar = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  margin-bottom: 20px;
`;

const Card = styled.View`
  width: 85%;
  background-color: ${theme.colors.branco};
  border-radius: 12px;
  padding: 20px;
  elevation: 4;
`;

const Label = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  color: ${theme.colors.azulEscuro};
  margin-bottom: 6px;
  font-family: ${theme.fonts.bold};
`;

const Input = styled.TextInput<{ $locked?: boolean }>`
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
  opacity: ${(props) => (props.$locked ? 0.6 : 1)};
  font-size: ${theme.typography.title.fontSize}px;
  font-family: ${theme.fonts.regular};
`;

const ButtonEditar = styled.TouchableOpacity`
  background-color: ${theme.colors.azulClaro};
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonSalvar = styled.TouchableOpacity`
  background-color: ${theme.colors.azulEscuro};
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-size: ${theme.typography.title.fontSize}px;
  font-family: ${theme.fonts.bold};
`;
