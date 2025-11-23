import React from "react";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type FooterNavigationProps = {
    active: "home" | "profissao" | "perfil"; 
};

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ active }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <FooterContainer>

            <FooterTouchable onPress={() => navigation.navigate("ProfissaoUsuario")}>
                <FooterImage
                    source={
                        active === "profissao"
                            ? require("../../assets/navegacao/profissao_azul.png")
                            : require("../../assets/navegacao/profissao_cinza.png")
                    }
                />
            </FooterTouchable>

            <FooterTouchable onPress={() => navigation.navigate("Home")}>
                <FooterImage
                    source={
                        active === "home"
                            ? require("../../assets/navegacao/home_azul.png")
                            : require("../../assets/navegacao/home_cinza.png")
                    }
                />
            </FooterTouchable>
            
            <FooterTouchable onPress={() => navigation.navigate("PerfilUsuario")}>
                <FooterImage
                    source={
                        active === "perfil"
                            ? require("../../assets/navegacao/perfil_azul.png")
                            : require("../../assets/navegacao/perfil_cinza.png")
                    }
                />
            </FooterTouchable>
        </FooterContainer>
    );
};

const FooterContainer = styled.View`
    width: 100%;
    height: 80px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 60px;
    background-color: ${theme.colors.branco};
    padding: 15px;

    border-top-width: 1px;
    border-top-color: #d3d3d3;
`;

const FooterTouchable = styled.TouchableOpacity``;

const FooterImage = styled.Image`
    width: 60px;
    height: 60px;
`;
