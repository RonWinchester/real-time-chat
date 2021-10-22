export default function reducer (state, action) {
  switch (action.type) {
    case "loggedIn":
      return {
        ...state,
        loggedIn: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId
      };

      case "set_users":
        return {
          ...state,
          users: action.payload
        };

        case "set_message":
        return {
          ...state,
          textMessage: action.payload
        };

    default:
      return state;
  }
};
