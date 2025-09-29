import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";

export const Home = () => {
  const baseURL = "https://www.swapi.tech/api";

  const { store, dispatch } = useGlobalReducer();

  const getPeople = () => {
    fetch(baseURL + "/people")
      .then((allPeople) => {
        return allPeople.json();
      })
      .then((data) => {
        console.log("Star Wars people from SWAPI.tech API:", data.results);
      });
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>My Star Wars Database</h1>
      <p>
		<img src={"https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"} />
      </p>
    </div>
  );
};
