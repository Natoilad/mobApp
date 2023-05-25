import React, { useState, useEffect } from 'react';
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
  Dimensions,
} from 'react-native';
import LognScreen from './LoginScreen';

const image = {
  uri: 'https://instagram.fiev27-1.fna.fbcdn.net/v/t51.2885-15/301784892_1035054610400791_4093792191038428247_n.jpg?stp=dst-jpg_e35_p720x720_sh0.08&_nc_ht=instagram.fiev27-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=yZk3Jrqzpv4AX9rORWq&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MjkxNDkyMzcxMDU3NDA5MjI0MA%3D%3D.2-ccb7-5&oh=00_AfBJvI0tFZEDFQI8IjlUj4YGTMF8104dyIsk6MyHu-kYGg&oe=6474F130&_nc_sid=a1ad6c.jpg',
};

const initialState = {
  name: '',
  password: '',
  email: '',
};

export default function RegisterScreen({ navigation }) {
  const [isFocus, setIsFocus] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 50 * 2
  );

  useEffect(() => {
    const onChande = () => {
      const width = Dimensions.get('window').width - 50 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener('change', onChande);
    return () => {
      Dimensions.removeEventListener('change', onChande);
    };
  }, []);

  const nameHandler = text =>
    setState(prevstate => ({ ...prevstate, name: text }));
  const emailHandler = text =>
    setState(prevstate => ({ ...prevstate, email: text }));
  const passwordHandler = text =>
    setState(prevstate => ({ ...prevstate, password: text }));

  const onLogin = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
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
                style={{ ...styles.header, marginBottom: isFocus ? 150 : 300 }}
              >
                Sing up please{' '}
              </Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isFocus ? 20 : 150,
                  width: dimensions,
                }}
              >
                <TextInput
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  value={state.name}
                  onChangeText={nameHandler}
                  placeholder="Username"
                  style={styles.input}
                />
                <TextInput
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  value={state.email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  style={styles.input}
                />
                <TextInput
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  value={state.password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                />
                <Button
                  title={'Sign up'}
                  style={styles.input}
                  onPress={() => {
                    keyHide();
                    onLogin();
                  }}
                />
                <TouchableWithoutFeedback
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      color: 'white',
                      textAlign: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'white',
                      // color: 'black',
                    }}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Login
                  </Text>
                </TouchableWithoutFeedback>
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
  },
  header: {
    borderRadius: 10,
    // backgroundColor: 'white',
    fontSize: 36,
    color: 'green',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  input: {
    // width: 200,
    // height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  form: {
    borderRadius: 10,
    // alignItems: 'center',
  },
});
