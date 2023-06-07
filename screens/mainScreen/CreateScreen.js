import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

// import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoLocationName, setPhotoLocationName] = useState('');
  const [photo, setPhoto] = useState('');

  // const localPhoto = {
  //   uri: 'https://instagram.fiev27-1.fna.fbcdn.net/v/t39.30808-6/339731547_1412529529546253_1074306498937314805_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.fiev27-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=JSX_eGGfHFoAX8jL8TO&edm=AJ9x6zYAAAAA&ccb=7-5&ig_cache_key=MzEwNDQ1MjU3MDM5ODE2MjYyOQ%3D%3D.2-ccb7-5&oh=00_AfCIClxcoLOBAqB2-Ho8mEmdwArptwspiUle1k3C39hgSg&oe=646C40B1&_nc_sid=5f7460.jpg',
  // };

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

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo);
      // console.log(photo);
    }
  };
  const sendPhoto = () => {
    // console.log(navigation);
    navigation.navigate('Posts', { photo });
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={ref => {
          setCamera(ref);
        }}
      >
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{
                uri: photo.uri,
              }}
              style={{ width: 300, height: 300 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.send}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  camera: {
    // flex: 1,
    height: '70%',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
    justifyContent: 'flex-end',
  },
  snapContainer: {
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 50,
    padding: 10,
    width: 80,
    height: 80,
  },

  snap: {
    color: 'white',
    fontSize: 20,
  },
  takePhotoContainer: {
    flex: 1,
    position: 'absolute',
    top: 50,
    // left: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  sendBtn: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'green',
    borderRadius: 50,
    padding: 10,
    // width: 80,
    height: 50,
    marginTop: 20,
  },
  send: {
    color: 'black',
    fontSize: 20,
  },
});
export default CreateScreen;
