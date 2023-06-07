import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screen
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostsScreen from './screens/MainScreens/PostsScreen';
import CreateScreen from './screens/MainScreens/CreatePostsScreen';
import ProfileScreen from './screens/MainScreens/ProfileScreen';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MapScreen } from './screens/MainScreens/MapScreen';

//stack
const authStack = createNativeStackNavigator();
const mainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <authStack.Navigator>
        <authStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <authStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
      </authStack.Navigator>
    );
  }
  return (
    <mainTab.Navigator
    // tabBarOptions= {{ showLabel: false }}
    >
      <mainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            <MaterialCommunityIcons name="post" size={36} color="black" />;
          },
          headerShown: false,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <mainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            <MaterialIcons name="create" size={24} color="black" />;
          },
          headerShown: false,
        }}
        name="Create"
        component={CreateScreen}
      />
      <mainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            <AntDesign name="profile" size={24} color="black" />;
          },
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </mainTab.Navigator>
  );
};
