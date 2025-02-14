import styles from "./MovieCastItem.module.css";
import defaultImage from "../../assets/img/image-not-found.jpg";

const MovieCastItem = ({ dataCast }) => {
  const { profile_path, name, character } = dataCast;
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
    : defaultImage;

  return (
    <div className={styles.castItem}>
      <img
        className={styles.castImg}
        src={imageUrl}
        alt={name}
        width="200"
        height="300"
      />
      <div className={styles.castInfo}>
        <h3 className={styles.castName}>{name}</h3>
        <p className={styles.castCharacter}>
          <span className={styles.label}>Character:</span> {character}
        </p>
      </div>
    </div>
  );
};

export default MovieCastItem;