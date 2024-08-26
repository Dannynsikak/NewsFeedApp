import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import authReducer from "../features/auth/authSlice";

// An example slice reducer function that shiws how a redux reducer works iside .
// will soon be replaced with real app logic.

// function CounterReducer(state: CounterState = { value: 0 }, action: Action) {
//   switch (action.type) {
//     // handle actions here
//     default: {
//       return state;
//     }
//   }
// }

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    // Declare that state.counter will be updated by the counterReducer function
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
