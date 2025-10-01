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

  const getPeopleMass = (personUID) => {
    fetch(store.baseURL + "/people/" + personUID)
      .then((personMass) => {
        return personMass.json();
      })
      .then((data) => {
        store.peopleMass[personUID - 1] = data.result.properties.height;
      });
  };

  const getAllPeopleMass = () => {
    for (let i = 0; i < store.people.length; i++) {
      getPeopleMass(i + 1);
    }
  };

  useEffect(() => {
    getPeople();
    getAllPeopleMass();
  }, []);

  if (store.people.length == 0) {
    console.log("Star Wars characters: ", store?.people);
  }
  return (
    <div className="text-center mt-5">
      <p className="bg-info"><i class="fa-solid fa-wrench"></i>I'm using SWAPI.info because SWAPI.tech is taking WAAAAY too long to load each request!</p>
      <section>
        <h2 className="text-warning bg-dark text-start ms-5">Characters</h2>
        <div className="row flex-nowrap overflow-auto">
          {store.people.length > 0 ? (
            store.people.map((person, index) => {
              return (
                <div key={index} className="col">
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"
                    }
                    alt=""
                    className="profile-image"
                  />
                  <h3>{person.name}</h3>
                  <ul>
                    <li className="text-start">
                      Mass:{" "}
                      {store.peopleMass.length > 0 ? (
                        store.peopleMass[index]
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                    </li>
                    <li></li>
                    <li></li>
                  </ul>
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
