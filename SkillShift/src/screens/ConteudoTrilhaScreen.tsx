import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { RouteProp } from "@react-navigation/native";
import { Linking } from "react-native";
import { TrilhaService } from "../services/trilhaService";
import { ConteudoEspecifico } from "../types/conteudoTrilha";

type ConteudoProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ConteudoTrilha">;
    route: RouteProp<RootStackParamList, "ConteudoTrilha">;
};

export const ConteudoTrilhaScreen: React.FC<ConteudoProps> = ({ route, navigation }) => {
    const { idTrilha, idConteudo, nomeTrilha } = route.params;

    const [conteudo, setConteudo] = useState<ConteudoEspecifico | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingBotao, setLoadingBotao] = useState(false);

    const extrairIdYoutube = (url: string) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const abrirVideoNoYoutube = () => {
        if (!conteudo) return;
        Linking.openURL(conteudo.textoConteudoTrilha);
    };

    const carregarConteudo = async () => {
        try {
            const data = await TrilhaService.buscarConteudoEspecifico(idTrilha, idConteudo);
            setConteudo(data);
        } catch (error) {
            console.error("Erro ao carregar conteúdo:", error);
        } finally {
            setLoading(false);
        }
    };

    const marcarConcluido = async () => {
        try {
            setLoadingBotao(true);
            await TrilhaService.marcarConteudoComoConcluido(idTrilha, idConteudo);
            await carregarConteudo();
        } catch (error) {
            console.error("Erro ao concluir:", error);
        } finally {
            setLoadingBotao(false);
        }
    };

    useEffect(() => {
        carregarConteudo();
    }, [idTrilha, idConteudo]);

    return (
        <PageContainer>
            <HeaderNavigation title={nomeTrilha} navigationProp={navigation} backTo="Home" />

            <ContentArea>
                {loading && <LoadingText>Carregando conteúdo...</LoadingText>}

                {!loading && conteudo && (
                    <>
                        <Titulo>{conteudo.nomeConteudoTrilha}</Titulo>

                        {conteudo.tipoConteudoTrilha === "Vídeo" ? (
                            <VideoBox onPress={abrirVideoNoYoutube}>
                                <VideoText>Abrir vídeo no YouTube</VideoText>
                            </VideoBox>
                        ) : (
                            <Texto>{conteudo.textoConteudoTrilha}</Texto>
                        )}

                        <Button
                            disabled={conteudo.conteudoTrilhaConcluida || loadingBotao}
                            onPress={marcarConcluido}
                        >
                            <ButtonText>
                                {conteudo.conteudoTrilhaConcluida
                                    ? "Conteúdo já concluído"
                                    : loadingBotao
                                    ? "Salvando..."
                                    : "Marcar como concluído"}
                            </ButtonText>
                        </Button>
                    </>
                )}
            </ContentArea>
        </PageContainer>
    );
};

const PageContainer = styled.View`
    flex: 1;
    background-color: ${theme.colors.branco};
`;

const ContentArea = styled.ScrollView`
    flex: 1;
    padding: 100px 20px 40px;
`;

const LoadingText = styled.Text`
    font-size: ${theme.typography.title.fontSize}px;
    color: ${theme.colors.preto};
    font-family: ${theme.fonts.bold};
    text-align: center;
    margin-top: 40px;
`;

const Titulo = styled.Text`
    font-size: ${theme.typography.title.fontSize}px;
    font-family: ${theme.fonts.bold};
    margin-bottom: 20px;
    color: ${theme.colors.preto};
`;

const Texto = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${theme.typography.body.fontSize}px;
    line-height: 24px;
    color: ${theme.colors.preto};
`;

const VideoBox = styled.TouchableOpacity`
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    background-color: ${theme.colors.azulEscuro};
    margin-bottom: 20px;
    align-items: center;
`;

const VideoText = styled.Text`
    color: ${theme.colors.branco};
    font-family: ${theme.fonts.bold};
    font-size: ${theme.typography.subtitle.fontSize}px;
`;

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
    width: 100%;
    padding: 15px;
    margin-top: 40px;
    border-radius: 12px;
    background-color: ${(p) =>
        p.disabled ? theme.colors.cinza : theme.colors.azulEscuro};
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};
    align-items: center;
`;

const ButtonText = styled.Text`
    color: ${theme.colors.branco};
    font-family: ${theme.fonts.bold};
    font-size: ${theme.typography.subtitle.fontSize}px;
`;
