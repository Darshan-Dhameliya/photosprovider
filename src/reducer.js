export const initialState = {
  islogin: false,
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        islogin: true,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        islogin: false,
      };

    case "ADD_IMAGES": {
      return {
        ...state,
        images: action.item,
      };
    }
    default:
      return state;
  }
};

export default reducer;
