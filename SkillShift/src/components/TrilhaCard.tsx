import React from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";

type TrilhaCardProps = {
    id: string;
    title: string;
    quantity: number;
    concluded: boolean;
    onPress: (id: string) => void;
};

export const TrilhaCard: React.FC<TrilhaCardProps> = ({
    id,
    title,
    quantity,
    concluded,
    onPress
}) => {

    const imagensPorTitulo: Record<string, any> = {
        "Introdução ao Futuro do Trabalho": require("../../assets/trilhas/futuro.png"),
        "Inteligência Artificial Aplicada": require("../../assets/trilhas/ia.png"),
        "Habilidades Digitais Essenciais": require("../../assets/trilhas/habilidades_digitais.png"),
        "Carreira em Tecnologia": require("../../assets/trilhas/crescimento.png"),
        "Empreendedorismo Moderno": require("../../assets/trilhas/empreendorismo.png"),
        "Produtividade e Organização": require("../../assets/trilhas/organizacao.png"),
        "Soft Skills do Futuro": require("../../assets/trilhas/soft_skill.png"),
        "Dados e Analytics": require("../../assets/trilhas/dados.png"),
        "Criatividade e Inovação": require("../../assets/trilhas/inovacao.png"),
        "Liderança e Gestão": require("../../assets/trilhas/lideranca.png")
    };

    const imagem = imagensPorTitulo[title] ?? require("../../assets/trilhas/futuro.png");

    return (
        <CardContainer onPress={() => onPress(id)}>
            <CardImage source={imagem} />

            <TextArea>
                <CardTitle>{title}</CardTitle>
                <CardConcluded>
                    {concluded ? "Concluído" : "Em progresso"}
                </CardConcluded>
                <CardSubtitle>Quantidade conteúdos: {quantity}</CardSubtitle>
                <CardSubtitle>{quantity * 15}m no total</CardSubtitle>
            </TextArea>
        </CardContainer>
    );
};

const CardContainer = styled.TouchableOpacity`
    width: 100%;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const TextArea = styled.View``;

const CardTitle = styled.Text`
    font-family: ${theme.fonts.bold};
    font-size: ${theme.typography.title.fontSize}px;
    font-weight: ${theme.typography.title.fontWeight};
    color: ${theme.colors.azulEscuro};
`;

const CardConcluded = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${theme.typography.subtitle.fontSize}px;
    font-weight: ${theme.typography.subtitle.fontWeight};
    color: ${theme.colors.azulClaro};
`;

const CardSubtitle = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${theme.typography.subtitle.fontSize}px;
    font-weight: ${theme.typography.subtitle.fontWeight};
    color: ${theme.colors.cinza};
`;

const CardImage = styled.Image`
    width: 60px;
    height: 60px;
`;
