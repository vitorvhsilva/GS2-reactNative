import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { FooterNavigation } from "../components/FooterNavigation";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {    
    return (
        <PageContainer>
            <ScrollArea>
                
            </ScrollArea>

            <FooterNavigation active="home"/>
        </PageContainer>
    );
}

const PageContainer = styled.View`
    flex: 1;
    background-color: ${theme.colors.branco};
`;

const ScrollArea = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;