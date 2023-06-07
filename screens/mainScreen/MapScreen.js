import MapView from 'react-native-maps';
import { View } from 'react-native';

export const MapScreen = () => {
  //   const { latitude, longitude } = route.params.location;
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}></MapView>
    </View>
  );
};
