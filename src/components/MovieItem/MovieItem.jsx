import { useState, useEffect } from "react";
import styles from "./MovieItem.module.css";
import defaultImage from "../../assets/img/image-not-found.jpg";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton"; // Імпортуємо бібліотеку Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Стилі для Skeleton

const MovieItem = ({ dataFilm }) => {
  const [loading, setLoading] = useState(true); // Додаємо стан для завантаження
  const { poster_path, title, release_date, vote_average } = dataFilm;

  const formattedDate = release_date
    ? format(new Date(release_date), "MMMM dd yyyy")
    : "Unknown date";
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : defaultImage;
  const voteAverage = vote_average ? vote_average.toFixed(1) : null;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2-секундна затримка
    return () => clearTimeout(timer); // Очищення таймера при розмонтуванні
  }, []);

  return (
    <div className={styles.movieItem}>
      {loading ? (
        <>

          <Skeleton className={styles.movieImg} width={350} height={500} />

          <div className={styles.movieInfo}>
            <Skeleton width="80%" height={30} className={styles.movieTitle} />
            <Skeleton width="60%" height={20} className={styles.movieText} />
            <Skeleton width="50%" height={20} className={styles.movieText} />
          </div>
        </>
      ) : (
        <>

          <img
            className={styles.movieImg}
            src={imageUrl}
            alt={title}
            width="350"
            height="500"
          />
          <div className={styles.movieInfo}>
            <h3 className={styles.movieTitle}>{title}</h3>
            <p className={styles.movieText}>Release date: {formattedDate}</p>
            {voteAverage && (
              <p className={styles.movieText}>Rating: {voteAverage}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieItem;