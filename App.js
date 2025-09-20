import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { useFontLoader } from './src/hooks/useFontLoader';
import Home from './src/screens/Home';
import Activity from './src/screens/Activity';
import Historico from './src/screens/Historico';
import Login from './src/screens/Login';
import PercursoDetalhes from './src/screens/PercursoDetalhes';
import CarsAnalytics from './src/screens/CarsAnalytics';
import Profile from './src/screens/Profile';
import ProfileStats from './src/screens/ProfileStats';

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PercursoDetalhes" component={PercursoDetalhes} />
        <Stack.Screen name="CarsAnalytics" component={CarsAnalytics} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileStats" component={ProfileStats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}