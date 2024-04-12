import { Dispatch, createContext, useContext, useReducer } from 'react';
import { ActionType, AppState, initialState, reducer } from './store';

type AppContextType = {
  state: AppState;
  dispatch: Dispatch<ActionType> | null;
};

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: null,
});

interface AppStateContextProviderProps {
  children: React.ReactNode;
}

export function AppStateContextProvider({
  children,
}: AppStateContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useDispatch = () => {
  const dispatch = useContext(AppContext).dispatch;
  if (dispatch === null) {
    throw new Error(
      'useDispatch must be used within a AppStateContextProvider'
    );
  }
  return dispatch;
};

export const useAppState = () => {
  const state = useContext(AppContext).state;
  return state;
};
