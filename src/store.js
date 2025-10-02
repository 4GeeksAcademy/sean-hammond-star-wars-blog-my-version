export const initialStore = () => {
  return {
    baseURL: "https://www.swapi.tech/api",
    people: [],
    peopleMass: [],
    peopleProperties: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set-people":
      console.log("action: ", action.payload);
      return {
        ...store,
        people: action.payload,
      };

    case "set-peopleProperties":
      return {
        ...store,
        peopleProperties: action.payload,
      };

    case "set-favorites":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "set-filteredFavorites":
      return {
        ...store,
        favorites: action.payload,
      };

    case "test":

    default:
      throw Error("Unknown action.");
  }
}
