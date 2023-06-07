import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts(prev => [...prev, route.params]);
    }
  }, [route.params]);

  // console.log(posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: item.photo.uri }}
              style={{
                width: 350,
                height: 350,
              }}
            />
          </View>
        )}
      />
      <TouchableWithoutFeedback
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('map')}
        >
          Register
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'green',
  },
  takePhotoContainer: {
    top: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PostsScreen;
