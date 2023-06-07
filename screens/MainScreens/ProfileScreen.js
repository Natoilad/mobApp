import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';
import {
  collection,
  query,
  where,
  onSnapshot,
  increment,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
  require('../../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userId, login, userAvatar } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;

  const handleLike = async item => {
    const postLiksRef = doc(db, 'posts', item.id);

    await updateDoc(postLiksRef, {
      liks: increment(1),
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    onSnapshot(q, docSnap =>
      setPosts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      style={styles.imageBg}
      source={require('../../assets/images/bg.jpg')}
    >
      <View style={styles.container}>
        <View style={styles.wrappContent}>
          <View style={styles.wrappAvatar}>
            <Image style={styles.avatarUser} source={{ uri: userAvatar }} />
          </View>

          <TouchableOpacity onPress={signOut} style={styles.btnSignOut}>
            <Icon name="log-out" size={30} color="rgba(33, 33, 33, 0.8)" />
          </TouchableOpacity>
          <View style={styles.nameProfile}>
            <Text style={styles.userTitle}>{login}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ index, item }) => (
              <View style={styles.wrapImg}>
                <Image
                  source={{ uri: item.photoStorage }}
                  style={{
                    ...styles.img,
                    width: screenWidth * 0.9,
                    height: screenWidth * 0.65,
                  }}
                />
                <View style={styles.wrappContentPost}>
                  {posts.length !== 0 && (
                    <Text style={styles.placeTitle}>{item.place}</Text>
                  )}
                </View>
                <View style={styles.wrappIcon}>
                  <View style={styles.wrappContentIcon}>
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
                    <TouchableOpacity
                      style={styles.iconThumbUp}
                      onPress={() => handleLike(item)}
                    >
                      <Icon name="thumbs-up" size={24} color="orange" />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: '#212121',
                          fontSize: 16,
                          lineHeight: 19,
                        }}
                      >
                        {item.liks}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.wrappIconMap}>
                    <TouchableOpacity
                      style={{ marginRight: 8 }}
                      onPress={() => {
                        navigation.navigate('Map', { location: item.location });
                      }}
                    >
                      <Icon
                        name="map"
                        size={20}
                        color="rgba(33, 33, 33, 0.8)"
                      />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  container: {
    flex: 1,
    marginTop: 147,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.2)',
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 150,
  },

  wrappAvatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapImg: {
    marginBottom: 34,
  },

  wrappContentPost: {
    marginTop: 8,
    marginBottom: 11,
  },

  countComment: { fontSize: 16, lineHeight: 19 },

  btnSignOut: {
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 1000,
  },

  wrapCountComment: { marginLeft: 5, justifyContent: 'center' },

  wrappContentIcon: {
    flex: 1,
    flexDirection: 'row',
  },

  wrappContent: { position: 'relative' },

  iconThumbUp: { marginLeft: 27 },

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

  wrappIconMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  wrappIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  nameProfile: {
    marginBottom: 33,
    marginTop: 15,
  },

  userTitle: {
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'Bold',
    fontSize: 20,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 63,
  },
  avatarUser: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
