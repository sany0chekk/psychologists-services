export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isAuthorized: boolean;
  isRefreshing: boolean;
}
