import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../redux/auth/authOperations';
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
  Image,
} from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
};

const Icon = createIconSetFromIcoMoon(
  require('../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export const Registration = ({ navigation }) => {
  const [auth, setAuth] = useState(initialState);
  const [showPassford, setShowPassword] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPasword] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatarToServer = async photo => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = await ref(storage, `avatar/${uniquePostId}`);

    const uploadPhoto = await uploadBytes(storageRef, file);

    const takePhoto = await getDownloadURL(uploadPhoto.ref);

    return takePhoto;
  };

  const handlClickBtn = async () => {
    try {
      const refAvatar = await uploadAvatarToServer(avatar);

      const newAuth = {
        avatar: refAvatar,
        login: auth.login,
        email: auth.email,
        password: auth.password,
      };
      dispatch(authSignUpUser(newAuth));

      setAuth(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const togleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -140 : -136;
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
              <View style={styles.photoWrapp}>
                {avatar && (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
                <TouchableOpacity
                  style={{ position: 'absolute', bottom: 14, right: -14 }}
                  onPress={pickImage}
                >
                  {!avatar ? (
                    <Icon
                      name="plus_icon"
                      size={27}
                      color="rgba(255, 108, 0, 1)"
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formTitle}>Регистрация</Text>
              </View>
              <View>
                <TextInput
                  value={auth.login}
                  onChangeText={value =>
                    setAuth(prevLogin => ({ ...prevLogin, login: value }))
                  }
                  style={[
                    styles.input,
                    {
                      borderColor: isFocusedLogin ? '#FFA500' : '#ccc',
                      borderWidth: isFocusedLogin ? 2 : 1,
                    },
                  ]}
                  onFocus={() => setIsFocusedLogin(true)}
                  onBlur={() => setIsFocusedLogin(false)}
                  placeholder="Логин"
                />
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
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.linkTitle}>Уже есть аккаунт? Войти</Text>
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
    paddingTop: 92,
    paddingBottom: 45,
    position: 'relative',
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
  photoWrapp: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: '-19%',
    left: '37%',
    borderRadius: 16,
  },

  btnAddPhoto: {},
});
