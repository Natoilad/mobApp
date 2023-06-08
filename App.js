import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Main } from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    Medium: require('./assets/fonts/DMMono-Medium.ttf'),
    Bold: require('./assets/fonts/DMMono-Light.ttf'),
    Regular: require('./assets/fonts/DMMono-Regular.ttf'),
    Inter: require('./assets/fonts/DMMono-MediumItalic.ttf'),
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
