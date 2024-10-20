//In Reducers folder we are going to create the list of all the reducers that we require for the project
//Reducers help in doing repetitive take like user list, donation list\

//here we are creating slice where, name of the redux, initialstate and reducer are defined altogether

// Importing the createSlice function from the Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

// Defining the initial state for the user slice of the store
const initialState = {
  userId: 1,
  firstName: 'Meet',
  lastName: 'Parpani',
  profileImage:'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

// Creating a new slice of the store named "user" with its own set of reducers
export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // Defining the "updateFirstName" reducer function
    // It takes the current state and an action object as parameters
    // It updates the firstName field of the state with the payload value of the action
    resetToInitialState: () => {  //this reducer needs to be set up everytime as if u want to make aqny changes in the store after it is created, this function will help you to do so, otherwise only the old values will be fetched.
      return initialState;
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload.firstName;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload.lastName;
    },
  }
});

// Exporting the reducers here from the "User" slice
// makes them available to other parts of the app that want to use it
export const {resetToInitialState, updateFirstName, updateLastName} = User.actions;
export default User.reducer;