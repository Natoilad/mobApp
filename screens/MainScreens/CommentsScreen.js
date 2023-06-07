import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { format } from 'date-fns';
import {
  collection,
  updateDoc,
  doc,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
} from 'react-native';

const Icon = createIconSetFromIcoMoon(
  require('../../assets/iconMoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const postId = route.params.postId;
  const { login, userAvatar, userId } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      await getAllComments();
    })();
  }, []);

  const createPost = async () => {
    const date = new Date();

    const formatData = format(new Date(date), 'dd MMMM, yyyy | HH:mm');

    const dbRef = await doc(db, 'posts', postId);
    await updateDoc(dbRef, {
      comments: allComments.length + 1,
    });
    await addDoc(collection(dbRef, 'comments'), {
      comment,
      login,
      userId,
      userAvatar,
      formatData,
    });

    setComment('');
  };

  const getAllComments = async () => {
    try {
      const dbRef = doc(db, 'posts', postId);
      onSnapshot(collection(dbRef, 'comments'), docSnap =>
        setAllComments(docSnap.docs.map(doc => ({ ...doc.data() })))
      );
    } catch (error) {
      console.log(`getAllComments`, error);
    }
  };

  const markupComment = item => {
    if (item.userId === userId) {
      return (
        <View
          style={{
            ...styles.containerImgComent,
            marginLeft: Platform.OS === 'ios' ? 0 : 90,
          }}
        >
          <View
            style={{
              ...styles.commentContainer,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentData}>{item.formatData}</Text>
          </View>
          <Image
            style={{ ...styles.userAvatarImg, marginRight: 0, marginLeft: 5 }}
            source={{
              uri: item.userAvatar,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.containerImgComent}>
          <Image
            style={styles.userAvatarImg}
            source={{
              uri: item.userAvatar,
            }}
          />
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentData}>{item.formatData}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: route.params.photo }} />
        </View>

        <FlatList
          data={allComments}
          renderItem={({ item }) => markupComment(item)}
          keyExtractor={(_, i) => i.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Комментировать..."
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={createPost}
            activeOpacity={0.6}
            style={styles.btnSend}
          >
            <Icon name="Vector" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  imgContainer: {
    marginBottom: 32,
    marginTop: 32,

    alignItems: 'center',
  },

  img: {
    width: 370,
    height: 240,
    borderRadius: 8,
  },

  commentContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    width: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginBottom: 24,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },

  inputContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    // marginBottom: 16,
  },

  textInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },

  btnSend: {
    position: 'absolute',
    bottom: 8,
    right: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
  },

  commentData: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },

  containerImgComent: {
    flex: 1,
    flexDirection: 'row',
  },
  userAvatarImg: { width: 28, height: 28, borderRadius: 100, marginRight: 5 },
});
