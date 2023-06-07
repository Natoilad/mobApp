import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db, storage } from '../../firebase/config';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
  require('../../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState('');
  const [place, setPlace] = useState('');
  const [photoLocationName, setPhotoLocationName] = useState('');

  const { userId, login } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    })();
  }, []);

  const takePhotoCamera = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();

      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  const updatePhotoToServer = async photoImg => {
    const response = await fetch(photoImg);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = await ref(storage, `postImage/${uniquePostId}`);

    const uploadPhoto = await uploadBytes(storageRef, file);

    const takePhoto = await getDownloadURL(uploadPhoto.ref);

    return takePhoto;
  };

  const sendPhoto = async () => {
    await writeDataToFirestore(photo);
    navigation.navigate('Posts', { photo });
    setPhoto('');
    setPlace('');
    setPhotoLocationName('');
  };

  const writeDataToFirestore = async myPhoto => {
    const photoStorage = await updatePhotoToServer(myPhoto);

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        photoStorage,
        location,
        place,
        userId,
        login,
        photoLocationName,
        liks: 0,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera
          style={styles.camera}
          ref={ref => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.photoView}>
            <View>
              {photo !== '' && (
                <Image
                  style={{ height: 240, width: 380 }}
                  source={{ uri: photo }}
                />
              )}
            </View>
          </View>
        </Camera>
        <TouchableOpacity style={styles.button} onPress={takePhotoCamera}>
          <Icon name="camer" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapContent}>
        <View style={styles.wrapTitile}>
          {photo !== '' ? (
            <Text style={styles.titleLoad}>Редактировать фото</Text>
          ) : (
            <Text style={styles.titleLoad}>Загрузить фото</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              style={styles.inputName}
              placeholder="Название..."
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <TextInput
              value={photoLocationName}
              onChangeText={value => setPhotoLocationName(value)}
              style={styles.inputLocation}
              placeholder="Местность..."
            />
          </View>
          <TouchableOpacity style={styles.MapBtn}>
            <Icon name="map" size={24} color="rgba(189, 189, 189, 1)" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={sendPhoto}
          activeOpacity={0.7}
          style={{
            ...styles.btn,
            backgroundColor:
              place !== '' && photoLocationName !== ''
                ? 'rgba(255, 108, 0, 1)'
                : '#F6F6F6',
          }}
        >
          <Text
            style={{
              ...styles.btnTitle,
              color:
                place !== '' && photoLocationName !== ''
                  ? '#fff'
                  : 'rgba(189, 189, 189, 1)',
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPhoto('')} style={styles.butDelete}>
          <Icon name="delete" size={24} color="#DADADA" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraWrap: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.3)',
  },
  camera: {
    height: 240,
    marginTop: 32,
    width: 380,
    // alignItems: "center",
    borderRadius: 28,
  },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: 'flex-end',
  },

  button: {
    position: 'absolute',
    top: '45%',
    left: '43%',

    borderColor: 'rgba(255, 255, 255, 0.5)',

    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  wrapContent: {
    paddingHorizontal: 16,
    marginTop: 8,
  },

  titleLoad: {
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  btn: {
    borderRadius: 100,
    fontFamily: 'Regular',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnTitle: {
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
  },
  butDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    width: 70,
    height: 40,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? '8%' : '40%',
  },

  form: {
    marginTop: 48,
  },

  inputName: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
  },

  inputLocation: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 30,
  },
  arrowLeft: {
    marginLeft: 16,
    position: 'absolute',
    top: 0,
    left: 50,
  },

  MapBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '60%' : '65%',
    left: 0,
  },
});
