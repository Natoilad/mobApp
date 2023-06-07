import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase/config';
import { useRoute } from '../router';
import { authSlice } from '../redux/auth/authReducer';

export const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector(state => state.auth);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
          userAvatar: user.photoURL,
          userEmail: user.email,
        };
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
