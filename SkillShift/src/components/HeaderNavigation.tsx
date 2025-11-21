import React from "react";
import styled from "styled-components/native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import theme from "../styles/theme";

type RoutesWithoutParams = {
  [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
}[keyof RootStackParamList];

type HeaderNavigationProps = {
    title: string;
    navigationProp?: NativeStackNavigationProp<RootStackParamList>;
    backTo?: RoutesWithoutParams;
    onBack?: () => void;
};

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
    title,
    navigationProp,
    backTo,
    onBack
}) => {
    const navigationFromHook = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const navigation = navigationProp ?? navigationFromHook;

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }

        if (navigation.canGoBack && navigation.canGoBack()) {
            navigation.goBack();
            return;
        }

        if (backTo) {
            navigation.navigate(backTo);
            return;
        }

        navigation.navigate("Home");
    };

    return (
        <HeaderContainer>
            <BackButton onPress={handleBack}>
                <BackIcon source={require("../../assets/navegacao/voltar.png")} />
            </BackButton>

            <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    padding: 20px 0px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.branco};
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    z-index: 10;
`;

const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
`;

const BackIcon = styled.Image`
    width: 28px;
    height: 28px;
`;

const HeaderTitle = styled.Text`
    font-size: 20px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.azulEscuro};
`;
