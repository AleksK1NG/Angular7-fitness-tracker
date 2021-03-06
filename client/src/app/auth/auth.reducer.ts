import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const getIsAuth = (state: State) => state.isAuthenticated;
