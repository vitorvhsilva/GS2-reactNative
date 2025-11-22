import { ThemeProvider } from 'styled-components';
import { AppRoutes } from './src/routes';
import theme from './src/styles/theme';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_700Bold': Poppins_700Bold, 
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.branco} 
        />
        <AppRoutes />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}