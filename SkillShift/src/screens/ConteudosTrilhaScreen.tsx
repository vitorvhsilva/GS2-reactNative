import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { RouteProp } from "@react-navigation/native";
import { FooterNavigation } from "../components/FooterNavigation";
import { ConteudoTrilhaCard } from "../components/ConteudoTrilhaCard";
import { TrilhaService } from "../services/trilhaService";
import { ConteudoTrilha } from "../types/conteudosTrilha";
import { useEffect, useState } from "react";

type ConteudosProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ConteudosTrilha">;
    route: RouteProp<RootStackParamList, "ConteudosTrilha">;
};

export const ConteudosTrilhaScreen: React.FC<ConteudosProps> = ({ route, navigation }) => {
    const { idTrilha } = route.params;

    const [conteudos, setConteudos] = useState<ConteudoTrilha[]>([]);

    useEffect(() => {
        carregarConteudos();
    }, []);

    const carregarConteudos = async () => {
        const dados = await TrilhaService.listarConteudosDaTrilha(idTrilha);
        setConteudos(dados.conteudos);
    };

    const navegarParaConteudo = (params: { idTrilha: string; idConteudo: string; nomeTrilha: string }) => {
        navigation.navigate("ConteudoTrilha", params);
    };

    return (
        <PageContainer>
            <HeaderNavigation
                title="Conteúdos da Trilha"
                navigationProp={navigation}
                backTo="Home"
            />

            <ContentArea>
                {conteudos.map((c) => (
                    <ConteudoTrilhaCard
                        key={c.idConteudoTrilha}
                        idTrilha={idTrilha}
                        idConteudo={c.idConteudoTrilha}
                        nomeConteudo={c.nomeConteudoTrilha}
                        tipoConteudo={c.tipoConteudoTrilha}
                        nomeTrilha={c.nomeConteudoTrilha}
                        concluido={c.conteudoTrilhaConcluida}
                        onPress={navegarParaConteudo}
                    />
                ))}
            </ContentArea>

            <FooterNavigation active="home" />
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;