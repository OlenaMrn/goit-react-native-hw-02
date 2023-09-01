import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import { authSlice } from "./authReducer";

// const rootReducer = combineReducers({
//   [authSlice.name]: authSlice.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });
////////
//////

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // import authorizationReducer from "./authorization/authSlice";
// // import postsReducer from "./posts/postsSlice";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//   authorization: authorizationReducer,
//   posts: postsReducer,
// });

// const reducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//           "authorization/registration/fulfilled",
//           "authorization/login/fulfilled",
//           "posts/addPosts/fulfilled",
//           "posts/getPosts/fulfilled",
//           "posts/addComment/fulfilled",
//           "posts/getComments/fulfilled",
//         ],
//         ignoredPaths: ["firebase", "firestore"],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export default { store, persistor };
