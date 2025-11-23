import React, { useState } from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { FooterNavigation } from "../components/FooterNavigation";
import { useAuth } from "../contexts/AuthContext";
import { QuestionAnswer, UsuarioLogin } from "../services/usuarioService";

export const ProfissaoUsuarioScreen: React.FC = () => {
    const { user, getUserCareer, createCareer } = useAuth();
    const [loading, setLoading] = useState(false);

    const [loginInfo, setLoginInfo] = useState<UsuarioLogin>({
        emailUsuario: user?.emailUsuario || "",
        senhaUsuario: "",
    });

    const [autenticado, setAutenticado] = useState(false);
    const [profissao, setProfissao] = useState<string | null>(null);
    const [respondendo, setRespondendo] = useState(false);
    const [respostasTemp, setRespostasTemp] = useState<string[]>([]);

    const PERGUNTAS = [
        "O que você mais gosta de fazer no dia a dia?",
        "Você prefere trabalhar com pessoas, dados, máquinas ou ideias?",
        "Qual seu interesse por IA? (0 a 10)",
        "Você se vê mais criativo(a), analítico(a) ou cuidador(a)?",
        "Como imagina o mundo do trabalho daqui 10 anos?",
        "Prefere rotina estável ou desafios constantes?",
        "Quais áreas mais chamam sua atenção atualmente?",
        "Prefere trabalho remoto, híbrido ou presencial?",
        "Quais habilidades você já domina?",
        "Quanto tempo está disposto a investir em estudos?",
    ];


    const autenticar = async () => {
        try {
            const career = await getUserCareer(loginInfo);
            setAutenticado(true);

            if (career.nomeProfissao) {
                setProfissao(career.nomeProfissao);
                setRespondendo(false);
            } else {
                setRespondendo(true);
            }
        } catch (err) {
            console.error("Erro ao autenticar carreira:", err);
        }
    };

    const finalizar = async () => {
        if (respostasTemp.length !== PERGUNTAS.length) return;

        const answers: QuestionAnswer[] = respostasTemp.map((resposta, index) => ({
            question_id: index + 1,
            resposta,
        }));

        try {
            setLoading(true);
            const career = await createCareer(loginInfo, answers);

            setProfissao(career.nome_profissao);
            setRespondendo(false);
        } catch (err) {
            console.error("Erro ao criar carreira:", err);
        } finally {
            setLoading(false);
        }
    };

    const resetar = () => {
        setRespondendo(true);
        setProfissao(null);
        setRespostasTemp([]);
    };

    return (
        <PageContainer>
            <Content>
                <Title>Profissão do Futuro</Title>

                {!autenticado && (
                    <>
                        <Input
                            placeholder="Digite seu email"
                            value={loginInfo.emailUsuario}
                            onChangeText={(txt) => setLoginInfo({ ...loginInfo, emailUsuario: txt })}
                        />
                        <Input
                            placeholder="Digite sua senha"
                            secureTextEntry
                            value={loginInfo.senhaUsuario}
                            onChangeText={(txt) => setLoginInfo({ ...loginInfo, senhaUsuario: txt })}
                        />
                        <Button onPress={autenticar}>
                            <ButtonText>Autenticar</ButtonText>
                        </Button>
                    </>
                )}

                {autenticado && profissao && !respondendo && (
                    <>
                        <Subtitle>Resultado encontrado:</Subtitle>

                        <ProfissaoBox>
                            <ProfissaoTitulo>Profissão sugerida:</ProfissaoTitulo>
                            <ProfissaoTexto>{profissao}</ProfissaoTexto>
                        </ProfissaoBox>

                        <Subtitle>Deseja responder novamente?</Subtitle>
                        <Button onPress={resetar}>
                            <ButtonText>Responder novamente</ButtonText>
                        </Button>
                    </>
                )}

                {autenticado && respondendo && (
                    <>
                        {PERGUNTAS.map((pergunta, index) => (
                            <PerguntaCard key={index}>
                                <PerguntaTexto>{index + 1}. {pergunta}</PerguntaTexto>
                                <Input
                                    placeholder="Digite sua resposta"
                                    value={respostasTemp[index] || ""}
                                    onChangeText={(txt) => {
                                        const novo = [...respostasTemp];
                                        novo[index] = txt;
                                        setRespostasTemp(novo);
                                    }}
                                />
                            </PerguntaCard>
                        ))}

                        <Button onPress={finalizar} disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>
                            <ButtonText>{loading ? "Carregando..." : "Finalizar"}</ButtonText>
                        </Button>
                    </>
                )}
            </Content>

            <FooterNavigation active="profissao" />
        </PageContainer>
    );
};

const PageContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.branco};
  justify-content: space-between;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  text-align: center;
  margin-bottom: 20px;
  color: ${theme.colors.azulEscuro};
  font-family: ${theme.fonts.bold};
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  text-align: center;
  color: ${theme.colors.azulEscuro};
  margin-bottom: 10px;
`;

const PerguntaCard = styled.View`
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const PerguntaTexto = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.azulEscuro};
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-family: ${theme.fonts.regular};
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.azulEscuro};
  padding: 14px;
  border-radius: 12px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.branco};
  font-size: ${theme.typography.title.fontSize}px;
  font-family: ${theme.fonts.bold};
`;

const ProfissaoBox = styled.View`
  background-color: #eeeeee;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProfissaoTitulo = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  color: ${theme.colors.azulEscuro};
  font-family: ${theme.fonts.bold};
  margin-bottom: 8px;
`;

const ProfissaoTexto = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  color: ${theme.colors.azulEscuro};
  font-family: ${theme.fonts.bold};
`;
