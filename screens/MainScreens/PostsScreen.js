import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Icon = createIconSetFromIcoMoon(
  require('../../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const { login, userEmail, userAvatar } = useSelector(state => state.auth);

  const screenWidth = Dimensions.get('window').width;

  const getDataFromFirestore = async () => {
    const dbRef = await collection(db, 'posts');
    onSnapshot(dbRef, docSnap =>
      setPosts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    (async () => {
      await getDataFromFirestore();
    })();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.wrappContent}>
        <View style={styles.containerUserProfile}>
          <Image style={styles.userImg} source={{ uri: userAvatar }} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.userName}>{login}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.wrapImg}>
              <Image
                source={{ uri: item.photoStorage }}
                style={{
                  ...styles.img,
                  width: screenWidth * 0.9,
                  height: screenWidth * 0.65,
                }}
              />
              <View style={styles.wrappPlaceTitle}>
                {posts.length !== 0 && (
                  <Text style={styles.placeTitle}>{item.place}</Text>
                )}
              </View>
              <View style={styles.wrapIconComment}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.id,
                        photo: item.photoStorage,
                      });
                    }}
                  >
                    <Icon
                      name="message-orange"
                      size={24}
                      color={
                        !item.comments
                          ? 'rgba(33, 33, 33, 0.3)'
                          : 'rgba(255, 108, 0, 1)'
                      }
                    />
                  </TouchableOpacity>
                  <View style={styles.wrapCountComment}>
                    <Text style={styles.countComment}>{item.comments}</Text>
                  </View>
                </View>

                <View style={styles.wrappIconMap}>
                  <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => {
                      navigation.navigate('Map', { location: item.location });
                    }}
                  >
                    <Icon name="map" size={20} color="rgba(33, 33, 33, 0.8)" />
                  </TouchableOpacity>
                  {posts.length !== 0 && (
                    <Text style={styles.nameLocation}>
                      {item.photoLocationName}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.2)',
    paddingHorizontal: 16,
  },

  containerUserProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },

  wrapCountComment: { marginLeft: 5, justifyContent: 'center' },

  countComment: { fontSize: 16, lineHeight: 19 },

  userImg: { width: 60, height: 60, borderRadius: 16 },

  userName: { color: '#212121', fontWeight: 700, fontSize: 13, lineHeight: 15 },

  userEmail: { fontSize: 11, lineHeight: 13, color: 'rgba(33, 33, 33, 0.8)' },

  wrappContent: {
    marginTop: 32,
  },

  wrappPlaceTitle: {
    marginTop: 8,
    marginBottom: 11,
  },

  wrapImg: {
    marginBottom: 34,
  },

  wrapIconComment: { flexDirection: 'row', justifyContent: 'space-between' },

  wrappIconMap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 10,
  },

  img: {
    width: 280,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },

  placeTitle: {
    color: '#212121',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },

  nameLocation: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});
