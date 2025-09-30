import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  // const [peopleList, setPeopleList] = useState([]);

  const getPeople = () => {
    fetch(store.baseURL + "/people")
      .then((allPeople) => {
        return allPeople.json();
      })
      .then((data) => {
        dispatch({
          type: "set-people",
          payload: data.results,
        });
        // setPeopleList(store.people);
      });
  };

  useEffect(() => {
    getPeople();
  }, []);

  if (store.people.length == 0) {
    console.log("Star Wars characters: ", store?.people);
  }
  return (
    <div className="text-center mt-5">
      <h1>My Star Wars Database</h1>
      {store.people.length > 0
        ? store.people.map((person, index) => {
            return (
              <div>
                <p>{person.name}</p>
              </div>
            );
          })
        : <p className="loading bg-info-subtle">Loading...</p>}
    </div>
  );
};
