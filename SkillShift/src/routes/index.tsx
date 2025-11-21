import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ConteudosTrilhaScreen } from '../screens/ConteudosTrilhaScreen';
import { ConteudoTrilhaScreen } from '../screens/ConteudoTrilhaScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ConteudosTrilha" component={ConteudosTrilhaScreen} />
        <Stack.Screen name="ConteudoTrilha" component={ConteudoTrilhaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}