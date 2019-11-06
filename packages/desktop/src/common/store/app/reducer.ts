export interface AppState {
  locale: string;
}

const initialState = (): AppState => ({
  locale: 'en',
});

export default (state = initialState(), action: any): AppState => {
  // const {payload} = action;
  switch (action.type) {
    case 'SET_STATE': {
      return {...state, ...action.payload.app};
    }
    case 'SIGNED_OUT':
      return initialState();

    default:
      return state;
  }
};
