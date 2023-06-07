import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { authSlice } from './authReducer';
import { auth } from '../../firebase/config';

export const authSignUpUser =
  ({ email, password, login, avatar }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      const updateUser = await updateProfile(user, {
        displayName: login,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = await auth.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authStateChanfeUser = async dispatch => {
  await onAuthStateChanged(auth, async user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log('error', error.message);
  }
};
