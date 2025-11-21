import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { RouteProp } from "@react-navigation/native";

type ConteudosProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ConteudosTrilha">;
    route: RouteProp<RootStackParamList, "ConteudosTrilha">;
};

export const ConteudosTrilhaScreen: React.FC<ConteudosProps> = ({ route, navigation }) => {
    const { idTrilha } = route.params;

    return (
        <PageContainer>
            <HeaderNavigation
                title="Minhas Trilhas"
                navigationProp={navigation} 
                backTo="Home"                 
            />

            <ContentArea>
            </ContentArea>
        </PageContainer>
    );
};

const PageContainer = styled.View`
    flex: 1;
    background-color: ${theme.colors.branco};
`;

const ContentArea = styled.View`
    flex: 1;
    padding-top: 100px;
`;