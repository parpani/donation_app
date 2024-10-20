import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categories: [
        {
          categoryId: 1,
          name: 'Highlight',
        },
        {
          categoryId: 2,
          name: 'Environment',
        },
        {
          categoryId: 3,
          name: 'Education',
        },
        {
          categoryId: 4,
          name: 'Clothing and Accessories',
        },
        {
          categoryId: 5,
          name: 'Household goods',
        },
        {
          categoryId: 6,
          name: 'Electronics',
        },
        {
          categoryId: 7,
          name: 'Toys and Games',
        },
        {
          categoryId: 8,
          name: 'Sports Equipment',
        },
        {
          categoryId: 9,
          name: 'Books and Media',
        },
        {
          categoryId: 10,
          name: 'Health and Beauty Products',
        },
        {
          categoryId: 11,
          name: 'Office supplies',
        },
        {
          categoryId: 12,
          name: 'Tools and Hardware',
        },
        {
          categoryId: 13,
          name: 'Art and Craft Supplies',
        },
    ],
};

export const Categories = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
      // Defining the "updateFirstName" reducer function
      // It takes the current state and an action object as parameters
      // It updates the firstName field of the state with the payload value of the action
      resetToInitialState: () => {  //this reducer needs to be set up everytime as if u want to make aqny changes in the store after it is created, this function will help you to do so, otherwise only the old values will be fetched.
        return initialState;
      },
      updateSelectedCategoryId: (state, action) => {
        //console.log("action", action.payload)
        state.selectedCategoryId = action.payload;
      },
    }
});

export const {resetToInitialState, updateSelectedCategoryId} = Categories.actions;
export default Categories.reducer;