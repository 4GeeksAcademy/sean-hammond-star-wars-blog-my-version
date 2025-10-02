import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  // const displayFavorites = () => {
  //   store.favorites.map((favorite, index) => {
  //     return <li key={index}>{favorite}</li>;
  //   });
  // };

  // useEffect(() => {
  //   displayFavorites();
  // }, []);

// const favoriteDeletionCheck = (favoriteToCheck, favoriteToDelete) => {
//     return favoriteToCheck != favoriteToDelete;
// }

const deleteFavorite = (nameOfFavorite) => {
      dispatch({
        type: "set-favorites",
        payload: nameOfFavorite,
      });
    console.log("Favorites array: ", store.favorites);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              id="site-logo"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"
              }
            />
          </span>
        </Link>
        <span>
          <h1 className="text-decoration-none">Star Wars Database</h1>
        </span>
        <div className="ml-auto">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#favoritesModal"
          >
            Favorites
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="favoritesModal"
            tabindex="-1"
            aria-labelledby="favoritesModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="favoritesModalLabel">
                    My Favorite Star Wars...
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Characters:</div>
                <ul>
                  {store.favorites.map((favorite, index) => {
                    return (
                      <div>
                        <li key={index}>{favorite}<button className="invisibleButton text-danger"><i class="fa-solid fa-square-xmark"></i></button></li>
                        
                      </div>
                    );
                  })}
                </ul>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End of modal */}
        </div>
      </div>
    </nav>
  );
};
