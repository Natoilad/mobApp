import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Button,
} from 'react-native';

const image = {
  uri: 'https://instagram.fiev27-1.fna.fbcdn.net/v/t39.30808-6/339731547_1412529529546253_1074306498937314805_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.fiev27-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=JSX_eGGfHFoAX8jL8TO&edm=AJ9x6zYAAAAA&ccb=7-5&ig_cache_key=MzEwNDQ1MjU3MDM5ODE2MjYyOQ%3D%3D.2-ccb7-5&oh=00_AfCIClxcoLOBAqB2-Ho8mEmdwArptwspiUle1k3C39hgSg&oe=646C40B1&_nc_sid=5f7460.jpg',
}; // import * as Font from 'expo-font';
// const loadFonts = async () => {
//   await Font.loadAsync({
//     'Roboto-Regulat': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
//     'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
//   });
// };

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    Alert.alert('Credentials', `${name} + ${password}`);
  };
  const keyHide = () => {
    Keyboard.dismiss();
    setIsFocus(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        keyHide();
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View>
              <Text
                style={{ ...styles.header, marginBottom: isFocus ? 250 : 400 }}
              >
                Welcome to Hell
              </Text>
              <View
                style={{ ...styles.form, marginBottom: isFocus ? 20 : 150 }}
              >
                <TextInput
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Username"
                  style={styles.input}
                />
                <TextInput
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                />
                <Button
                  title={'Login'}
                  style={styles.input}
                  onPress={() => {
                    keyHide();
                    onLogin();
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'white',
  },
  header: {
    // flex: 1,
    fontSize: 36,
    color: 'red',
    // borderWidth: 2,
    // borderColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    // top: 100,
    // marginBottom: 100,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    // width: '100%',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  form: {
    alignItems: 'center',
    // marginBottom: 300,
    // justifyConstent: 'center',
    // width: 300,
    // height: 44,
    // padding: 20,
    // borderWidth: 1,
    // borderColor: 'white',
  },
});

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>React Native It`s so hard</Text>
//       <TouchableOpacity style={styles.btn}>
//         <Text>Login</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     color: 'white',
//   },

//   btn: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     height: 50,
//     width: 150,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 130,
//   },
// });
