import { RootState } from "../store";

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const selectUser = (state: RootState) => state.user.user;
