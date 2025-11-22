import React, { useEffect, useState } from "react";
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
  const { user, updateUser } = useAuth();

  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState(user?.nomeUsuario || "");
  const [email, setEmail] = useState(user?.emailUsuario || "");
  const [dataNasc, setDataNasc] = useState(user?.dataNascimentoUsuario || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setNome(user?.nomeUsuario || "");
    setEmail(user?.emailUsuario || "");
    setDataNasc(user?.dataNascimentoUsuario || "");
  }, [user]);

  const salvarAlteracoes = async () => {
    setError(null);
    setSuccess(null);

    if (!senhaAtual) {
      setError("Informe sua senha atual para autenticar.");
      return;
    }

    const partes = dataNasc.split(/[\/-]/).map(Number);
    let dia = 0, mes = 0, ano = 0;

    if (partes.length === 3) {
      if (dataNasc.includes("/")) {
        dia = partes[0];
        mes = partes[1];
        ano = partes[2];
      } else {
        ano = partes[0];
        mes = partes[1];
        dia = partes[2];
      }
    }

    const senhaParaAtualizar = novaSenha && novaSenha.trim().length > 0 ? novaSenha : senhaAtual;

    setLoading(true);
    try {
      await updateUser(
        { emailUsuario: email, senhaUsuario: senhaAtual },
        {
          nomeUsuario: nome,
          senhaUsuario: senhaParaAtualizar,
          dia: dia,
          mes: mes,
          ano: ano,
        }
      );
      setSuccess("Usuário atualizado com sucesso");
      setEditando(false);
      setNovaSenha("");
      setSenhaAtual("");
    } catch (err: any) {
      setError(err?.message || "Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
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
          <Input
            editable={editando}
            value={dataNasc}
            onChangeText={setDataNasc}
            $locked={!editando}
            placeholder="dd/mm/aaaa ou aaaa-mm-dd"
          />

          <Label>Senha atual (obrigatória para salvar)</Label>
          <Input
            editable={editando}
            secureTextEntry
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            $locked={!editando}
            placeholder={editando ? "Digite sua senha atual" : "• • • • • •"}
          />

          <Label>Nova senha (opcional)</Label>
          <Input
            editable={editando}
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
            $locked={!editando}
            placeholder={editando ? "Digite nova senha (ou deixe em branco)" : "• • • • • •"}
          />

          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}

          {!editando ? (
            <ButtonEditar onPress={() => setEditando(true)}>
              <ButtonText>Editar</ButtonText>
            </ButtonEditar>
          ) : (
            <ButtonSalvar disabled={loading} onPress={salvarAlteracoes}>
              <ButtonText>{loading ? "Salvando..." : "Salvar"}</ButtonText>
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

const ErrorText = styled.Text`
  color: #d32f2f;
  margin-top: 6px;
  font-family: ${theme.fonts.regular};
  margin-bottom: 8px;
`;

const SuccessText = styled.Text`
  color: #2e7d32;
  margin-top: 6px;
  font-family: ${theme.fonts.regular};
  margin-bottom: 8px;
`;