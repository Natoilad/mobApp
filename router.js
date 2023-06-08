import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Registration } from './Screen/RegisterScreen';
import { Login } from './Screen/LoginScreen';
import { HomePage } from './Screen/MainScreens/Home';
import { CommentsScreen } from './Screen/MainScreens/CommentsScreen';
import { MapScreen } from './Screen/MainScreens/MapScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = isAuth => {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/iconMoon/icomoon.ttf'),
  });
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          component={Registration}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Home"
        component={HomePage}
      />
      <MainStack.Screen
        options={{
          headerTitleAlign: 'center',
          title: 'Коментарі',
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <MainStack.Screen
        options={{
          headerTitleAlign: 'center',
          title: 'Мапа',
        }}
        name="Map"
        component={MapScreen}
      />
    </MainStack.Navigator>
  );
};
