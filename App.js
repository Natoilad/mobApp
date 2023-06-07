import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from './router';

export default function App() {
  const routes = useRoute(true);
  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {
  //   setIsAuth(true);
  // }, []);
  const [fontsLoaded] = useFonts({
    Regular: require('./assets/fonts/DMMono-MediumItalic.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return <NavigationContainer>{routes}</NavigationContainer>;
}

//auth
// <authStack.Navigator>
//   <authStack.Screen
//     options={{
//       headerShown: false,
//     }}
//     name="Login"
//     component={LoginScreen}
//   />
//   <authStack.Screen
//     options={{
//       headerShown: false,
//     }}
//     name="Register"
//     component={RegisterScreen}
//   />
// </authStack.Navigator>;

// <mainTab.Navigator>
//   <mainTab.Screen name="Posts" component={PostsScreen} />
//   <mainTab.Screen name="Create" component={CreateScreen} />
//   <mainTab.Screen name="Profile" component={ProfileScreen} />
// </mainTab.Navigator>;
