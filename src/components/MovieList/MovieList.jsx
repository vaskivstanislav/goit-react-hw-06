import { Link, useLocation } from "react-router-dom";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";

const MovieList = ({ filmsList }) => {
  const location = useLocation();

  return (
    <div className={styles.containerList}>
      <ul className={styles.filmsList}>
        {filmsList.map((film) => (
          <li key={film.id} className={styles.filmItem}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              <MovieItem dataFilm={film} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;