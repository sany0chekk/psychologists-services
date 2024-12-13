import { RootState } from "../store";

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsRefreshing = (state: RootState) => state.user.isRefreshing;
export const selectIsLoading = (state: RootState) => state.user.loading;
