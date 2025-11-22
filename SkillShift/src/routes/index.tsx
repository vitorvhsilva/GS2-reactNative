import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ConteudosTrilhaScreen } from '../screens/ConteudosTrilhaScreen';
import { ConteudoTrilhaScreen } from '../screens/ConteudoTrilhaScreen';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { CadastroScreen } from '../screens/CadastroScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        { !user ? (
          <>          
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          </> 
        ) : ( 
          <>        
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ConteudosTrilha" component={ConteudosTrilhaScreen} />
            <Stack.Screen name="ConteudoTrilha" component={ConteudoTrilhaScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}