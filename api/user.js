import auth from '@react-native-firebase/auth'
import store from '../redux/store';
import {updateToken} from '../redux/reducers/User';

export const createUser = async (fullName, email, password) => {
  //console.log("entered")
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: fullName});
    console.log(user);
    return user;
  }
  catch (error){
    if (error.code === 'auth/email-already-in-use') {
      return {error: 'The email you entered is already in use'};
    } else if (error.code === 'auth/invalid-email') {
      return {error: 'Please enter a valid email address.'};
    }
    return {error: 'Something went wrong with your request.'};
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      return {status: false, error: 'Please enter a correct password'};
    } else if (error.code === 'auth/user-not-found') {
      return {
        status: false,
        error:
          'The email you entered does not exist. Please create a new account.',
      };
    }
    console.log(error)
    return {status: false, error: 'Something went wrong'};
  }
};

export const logOut = async () => {
  await auth().signOut();
};

export const checkToken = async () => {   //to run and get the token
  try {
    let response = await auth().currentUser.getIdToken(true);  //to get the token from the firebase
    console.log('We are updating token for you');
    store.dispatch(updateToken(response));  //to update it in store
    return response;
  } catch (error) {
    return error;
  }
};