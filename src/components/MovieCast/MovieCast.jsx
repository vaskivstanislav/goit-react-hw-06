
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmsDetails } from "../../js/films-api";
import MovieCastItem from "../MovieCastItem/MovieCastItem";
import Skeleton from 'react-loading-skeleton'; // Імпортуємо Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Імпортуємо стилі для скелетона
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { id } = useParams();
  const [castMembers, setCastMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelay, setLoadingDelay] = useState(false); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingDelay(true); 
    }, 3000); 

    const fetchCast = async () => {
      setLoading(true);
      try {
        const data = await getFilmsDetails(id, "/credits");
        setCastMembers(data.cast);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
    
    return () => clearTimeout(timeout); 
  }, [id]);

  return (
    <section className={styles.castSection}>
      {loading && loadingDelay ? (
       
        <div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeletonItem}>
              <Skeleton height={200} width={150} style={{ marginBottom: '10px' }} />
              <Skeleton height={20} width={100} />
            </div>
          ))}
        </div>
      ) : (
        <ul className={styles.castList}>
          {castMembers.map((member) => (
            <li key={member.id} className={styles.castItem}>
              <MovieCastItem dataCast={member} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieCast;
