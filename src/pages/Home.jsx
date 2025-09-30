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
      <section>
        <h2 className="text-warning bg-dark text-start ms-5">Characters</h2>
        <div className="row">
        {store.people.length > 0 ? (
          store.people.map((person, index) => {
            return (
              <div className="col">
                <img src="" alt="" />
                <p>{person.name}</p>
              </div>
            );
          })
        ) : (
          <h2 className="loading bg-info-subtle ms-5">Loading...</h2>
        )}
        </div>
      </section>
    </div>
  );
};
