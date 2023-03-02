import { configureStore } from "@reduxjs/toolkit";
import viewsReducer from "./features/views";
import resultReducer from "./features/results";
import constraintsReducer from "./features/constraints";
import clientsReducer from "./features/clients";
import initialResultReducer from "./features/initialResults";

export const store = configureStore({
  reducer: {
    views: viewsReducer,
    results: resultReducer,
    constraints: constraintsReducer,
    clients: clientsReducer,
    initialResults: initialResultReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
