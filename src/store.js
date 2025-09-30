export const initialStore = () => {
  return {
    baseURL: "https://www.swapi.tech/api",
    people: [],
    homeworld: 1,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set-people":
      console.log("action: ", action.payload)
      return {
        ...store,
        people: action.payload,
      };

    // case "set-hoemworld":
    //   console.log("action: ", action.payload)
    //   return {
    //     ...store,
    //     homeworld: action.payload,
    //   };
    
      case "test":

    default:
      throw Error("Unknown action.");
  }
}
