import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

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
      });
  };

  const getPeopleMass = (personUID) => {
    fetch(store.baseURL + "/people/" + personUID)
      .then((personMass) => {
        return personMass.json();
      })
      .then((data) => {
        store.peopleMass[personUID - 1] = data.result.properties.mass;
      });
  };

  const getAllPeopleMass = () => {
    for (let i = 0; i < store.people.length; i++) {
      getPeopleMass(i + 1);
    }
  };

  const getPeopleProperties = (personUID) => {
    fetch(store.baseURL + "/people/" + personUID)
      .then((personProperty) => {
        return personProperty.json();
      })
      .then((data) => {
        // const newPersonProperties = [...store.PeopleProperties];
        // newPersonProperties[personUID - 1] = data.result.properties;
        dispatch({
          type: "set-peopleProperties",
          // payload: newPersonProperties,
          // payload: data.result.properties,
          payload: Object.assign([], store.peopleProperties, {
            [personUID - 1]: data.result.properties,
          }),
        });
      });
  };

  const getAllPeopleProperties = async () => {
    for (let i = 0; i < store.people.length; i++) {
      getPeopleProperties(i + 1);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay to limit SWAPI.tech's rate slowing -- apparently not working!
    }
  };

  const addFavorite = (nameOfFavorite) => {
    !store.favorites.includes(nameOfFavorite) &&
      dispatch({
        type: "set-favorites",
        payload: nameOfFavorite,
      });
    console.log("Favorites array: ", store.favorites);
  };

  useEffect(() => {
    getPeople();
    // getAllPeopleMass();
    getAllPeopleProperties();
  }, []);

  // if (store.people.length == 0) {
  //   console.log("Star Wars characters: ", store?.people);
  // }
  return (
    <div className="text-center mt-5">
      <p className="bg-info">
        <i className="fa-solid fa-wrench"></i> SWAPI.tech is taking WAAAAY too
        long to load the character properties! Sorry for the wait!
      </p>
      <section>
        <h2 className="text-warning bg-dark text-start ms-5">Characters</h2>
        <div className="row flex-nowrap overflow-auto">
          {store.people.length > 0 ? (
            store.people.map((person, index) => {
              return (
                <div
                  key={index}
                  className="col"
                  onClick={() => addFavorite(person.name)}
                >
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
                      )}{" kg"}
                    </li>
                    <li className="text-start">
                      Height:{" "}
                      {store.peopleProperties[index] ? (
                        store.peopleProperties[index].height
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                      {" cm"}
                    </li>
                    <li className="text-start">
                      Born:{" "}
                      {store.peopleProperties[index] ? (
                        store.peopleProperties[index].birth_year
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                    </li>
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
