import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { FooterNavigation } from "../components/FooterNavigation";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { TrilhaCard } from "../components/TrilhaCard";
import { Trilha } from "../types/trilha";
import { TrilhaService } from "../services/trilhaService";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {    
    const [trilhas, setTrilhas] = useState<Trilha[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(false);

    const carregarTrilhas = async (page: number) => {
        setLoading(true);

        try {
            const res = await TrilhaService.listarTrilhas(page);

            setTrilhas(res.data);
            setTotalPaginas(res.totalPaginas);
        } catch (err) {
            console.error("Erro:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        carregarTrilhas(pagina);
    }, [pagina]);

    const navegarParaTrilha = (idTrilha: string) => {
        navigation.navigate("ConteudosTrilha", { idTrilha });
    };

    return (
        <PageContainer>

            {loading && trilhas.length === 0 ? (
                <LoadingCenter>
                    <ActivityIndicator size="large" color={theme.colors.azulClaro} />
                </LoadingCenter>
            ) : (
                <FlatList
                    data={trilhas}
                    keyExtractor={(item) => item.idTrilha}
                    renderItem={({ item }) => (
                        <TrilhaCard
                            id={item.idTrilha}
                            title={item.nomeTrilha}
                            quantity={item.quantidadeConteudosTrilha}
                            concluded={item.trilhaCompletada}
                            onPress={navegarParaTrilha}
                        />
                    )}
                    contentContainerStyle={{ padding: 20, alignItems: "flex-start", gap: 30 }}
                />
            )}

            <PaginationWrapper>
                <PageButton 
                    disabled={pagina === 1}
                    onPress={() => setPagina((prev) => prev - 1)}
                >
                    <PageButtonText disabled={pagina === 1}>Anterior</PageButtonText>
                </PageButton>

                <PageInfo>
                    Página {pagina} de {totalPaginas}
                </PageInfo>

                <PageButton 
                    disabled={pagina === totalPaginas}
                    onPress={() => setPagina((prev) => prev + 1)}
                >
                    <PageButtonText disabled={pagina === totalPaginas}>Próxima</PageButtonText>
                </PageButton>
            </PaginationWrapper>

            <FooterNavigation active="home" />
        </PageContainer>
    );
}

const PageContainer = styled.View`
    flex: 1;
    background-color: ${theme.colors.branco};
`;

const LoadingCenter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const PaginationWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-top-width: 1px;
    border-top-color: #dcdcdc;
`;

const PageButton = styled.TouchableOpacity<{ disabled?: boolean }>`
    padding: 10px 15px;
    background-color: ${({ disabled }) =>
        disabled ? "#cccccc" : theme.colors.azulClaro};
    border-radius: 8px;
`;

const PageButtonText = styled.Text<{ disabled?: boolean }>`
    color: white;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    font-size:${theme.typography.title.fontSize}px;
`;

const PageInfo = styled.Text`
    font-size:${theme.typography.title.fontSize}px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.azulEscuro};
`;
