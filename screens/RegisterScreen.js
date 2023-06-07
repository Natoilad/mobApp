import React, { useState } from 'react';
import { authSignInUser } from '../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

export const Login = ({ navigation }) => {
  const [auth, setAuth] = useState(initialState);
  const [showPassford, setShowPassword] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPasword] = useState(false);
  const dispatch = useDispatch();

  const handlClickBtn = () => {
    dispatch(authSignInUser(auth));
    setAuth(initialState);
  };

  const togleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -200 : -86;
  return (
    <ImageBackground
      style={styles.imageBg}
      source={require('../assets/images/bg.jpg')}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.formTitle}>Войти</Text>
              </View>

              <View>
                <TextInput
                  value={auth.email}
                  onChangeText={value =>
                    setAuth(prevLogin => ({ ...prevLogin, email: value }))
                  }
                  style={[
                    styles.input,
                    {
                      borderColor: isFocusedEmail ? '#FFA500' : '#ccc',
                      borderWidth: isFocusedEmail ? 2 : 1,
                    },
                  ]}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                />
              </View>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={auth.password}
                  onChangeText={value =>
                    setAuth(prevLogin => ({ ...prevLogin, password: value }))
                  }
                  secureTextEntry={showPassford}
                  style={[
                    styles.input,
                    {
                      borderColor: isFocusedPassword ? '#FFA500' : '#ccc',
                      borderWidth: isFocusedPassword ? 2 : 1,
                    },
                  ]}
                  placeholder="Пароль"
                  onFocus={() => setIsFocusedPasword(true)}
                  onBlur={() => setIsFocusedPasword(false)}
                />
                <TouchableOpacity
                  onPress={togleShowPassword}
                  activeOpacity={0.7}
                  style={styles.showPasswordWrap}
                >
                  <Text style={styles.showPasswordTitle}>Показать</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handlClickBtn}
                activeOpacity={0.7}
                style={styles.btn}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.linkTitle}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 111,
  },

  formTitle: {
    fontFamily: 'Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginBottom: 20,
  },

  input: {
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F6F6F6',
  },

  btn: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    fontFamily: 'Regular',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  linkTitle: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
    marginTop: 16,
    // marginBottom: 190,
  },
  showPasswordWrap: {
    position: 'absolute',
    top: 28,
    right: 16,
  },

  showPasswordTitle: {
    fontFamily: 'Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
