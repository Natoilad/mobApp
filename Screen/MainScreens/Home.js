import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const MainTab = createBottomTabNavigator();

export const Icon = createIconSetFromIcoMoon(
  require('../../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export const HomePage = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Публікації',
          headerRight: () => (
            <TouchableOpacity onPress={signOut} style={styles.logOutBtn}>
              <Icon name="log-out" size={24} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <View>
              <View>
                <Icon
                  name="grid_home"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </View>
              <Text>Posts</Text>
            </View>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={styles.arrowLeft}
              onPress={() => navigation.navigate('Posts')}
            >
              <Icon name="arrow-back" size={20} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: 'none' },
          headerTitleAlign: 'center',
          title: 'Створити публікацію',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View>
              <View style={styles.containerTabNav}>
                <Icon name="plus_empty_icon" size={24} color="#fff" />
              </View>
              <Text>Create post</Text>
            </View>
          ),
        })}
        name="CreatePost"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View>
              <View>
                <Icon name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
              </View>
              <Text>Profile</Text>
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerTabNav: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  },
  logOutBtn: {
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowLeft: {
    marginLeft: 16,
  },
});
