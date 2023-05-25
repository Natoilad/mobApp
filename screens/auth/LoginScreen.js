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
import RegisterScreen from './RegisterScreen';

const image = {
  uri: 'https://instagram.fiev27-1.fna.fbcdn.net/v/t39.30808-6/339731547_1412529529546253_1074306498937314805_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.fiev27-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=JSX_eGGfHFoAX8jL8TO&edm=AJ9x6zYAAAAA&ccb=7-5&ig_cache_key=MzEwNDQ1MjU3MDM5ODE2MjYyOQ%3D%3D.2-ccb7-5&oh=00_AfCIClxcoLOBAqB2-Ho8mEmdwArptwspiUle1k3C39hgSg&oe=646C40B1&_nc_sid=5f7460.jpg',
};

const initialState = {
  name: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
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
                style={{ ...styles.header, marginBottom: isFocus ? 250 : 400 }}
              >
                Welcome to Hell
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
                  value={state.password}
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
                    }}
                    onPress={() => navigation.navigate('Register')}
                  >
                    Register
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
    fontSize: 36,
    color: 'red',
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
  },
  form: {
    // alignItems: 'center',
  },
});
