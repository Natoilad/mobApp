import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Main } from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    Medium: require('./assets/fonts/Roboto-Medium.ttf'),
    Bold: require('./assets/fonts/Roboto-Bold.ttf'),
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
    Inter: require('./assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
