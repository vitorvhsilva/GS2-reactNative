import React from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";

type ConteudoTrilhaCardProps = {
    idTrilha: string;
    idConteudo: string;
    nomeConteudo: string;
    tipoConteudo: string;
    nomeTrilha: string;
    concluido: boolean;
    onPress: (params: { idTrilha: string; idConteudo: string; nomeTrilha: string }) => void;
};

export const ConteudoTrilhaCard: React.FC<ConteudoTrilhaCardProps> = ({
    idTrilha,
    idConteudo,
    nomeConteudo,
    tipoConteudo,
    nomeTrilha,
    concluido,
    onPress
}) => {
    const getIcon = () => {
        if (tipoConteudo.toLowerCase() === "vídeo" || tipoConteudo.toLowerCase() === "video") {
            return require("../../assets/trilhas/video.png");
        }
        return require("../../assets/trilhas/artigo.png");
    };

    return (
        <Container
            $concluido={concluido}
            onPress={() => onPress({ idTrilha, idConteudo, nomeTrilha })}
        >
            <Icone source={getIcon()} />

            <Texts>
                <Title $concluido={concluido}>{nomeConteudo}</Title>
                <Subtitle $concluido={concluido}>{tipoConteudo}</Subtitle>

                {concluido && <ConcluidoText>Concluído ✔</ConcluidoText>}
            </Texts>
        </Container>
    );
};

const Container = styled.TouchableOpacity<{ $concluido: boolean }>`
    width: 90%;
    flex-direction: row;
    align-items: center;
    background-color: ${(p) =>
        p.$concluido ? theme.colors.cinza : theme.colors.azulEscuro};
    padding: 15px;
    border-radius: 30px;
    margin: 10px 0;
    gap: 20px;
    opacity: ${(p) => (p.$concluido ? 0.6 : 1)};
`;

const Icone = styled.Image`
    width: 60px;
    height: 60px;
`;

const Texts = styled.View`
    flex-direction: column;
`;

const Title = styled.Text<{ $concluido: boolean }>`
    font-family: ${theme.fonts.regular};
    font-size: ${theme.typography.title.fontSize}px;
    color: ${(p) => (p.$concluido ? theme.colors.preto : theme.colors.branco)};
`;

const Subtitle = styled.Text<{ $concluido: boolean }>`
    font-family: ${theme.fonts.regular};
    font-size: ${theme.typography.subtitle.fontSize}px;
    color: ${(p) => (p.$concluido ? theme.colors.preto : theme.colors.branco)};
`;

const ConcluidoText = styled.Text`
    margin-top: 5px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.preto};
    font-size: 14px;
`;
