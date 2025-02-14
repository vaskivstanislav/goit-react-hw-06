import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
  } from "react-router-dom";
  import { format } from "date-fns";
  import { GoArrowLeft } from "react-icons/go";
  import { Suspense, useEffect, useState } from "react";
  import { getFilmsDetails } from "../../js/films-api";
  import Loader from "../../components/Loader/Loader";
  import defaultImage from "../../assets/img/image-not-found.jpg";
  import styles from "./MovieDetailsPage.module.css";
  import clsx from "clsx";
  import Skeleton from "react-loading-skeleton";
  import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
  
  const MovieDetailsPage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/";
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const dataFilm = await getFilmsDetails(id);
          setFilm(dataFilm);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) {
      return <Loader />;
    }
  
    if (!film) {
      return null;
    }
  
    const formattedDate = format(new Date(film.release_date), "MMMM dd yyyy");
    const userScore = film.vote_average
      ? (film.vote_average * 10).toFixed(0)
      : null;
    const imageUrl = film.poster_path
      ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
      : defaultImage;
  
    return (
      <section className={styles.movieDetails}>
        <Link to={backLinkHref}>
          <button className={styles.btnLink}>
            <GoArrowLeft size="20" /> Back
          </button>
        </Link>
        <div className={styles.movieDetailsSection}>
          <div className={styles.movieDetailsThumb}>
            {loading ? (
              <Skeleton
                className={styles.movieDetailsImg}
                width={350}
                height={500}
                duration={5.7} // Додав час відображення для скелетону
              />
            ) : (
              <img
                className={styles.movieDetailsImg}
                src={imageUrl}
                alt={film.original_title}
                width="350"
                height="500"
              />
            )}
            <div>
              {loading ? (
                <>
                  <Skeleton width="80%" height={30} duration={1.5} />
                  <Skeleton width="60%" height={20} duration={1.5} />
                  <Skeleton count={4} duration={1.5} />
                </>
              ) : (
                <>
                  <h2 className={styles.movieDetailsTitle}>
                    {film.original_title}
                  </h2>
                  <p className={styles.movieDetailsTagline}>{film.tagline}</p>
                  <p className={styles.movieDetailsText}>
                    <span className={styles.spanAccent}>Release date:</span>{" "}
                    {formattedDate}
                  </p>
                  {userScore && (
                    <p className={styles.movieDetailsText}>
                      <span className={styles.spanAccent}>User Score:</span>{" "}
                      {userScore}%
                    </p>
                  )}
                  <h3 className={styles.movieDetailsTitleFilm}>Overview</h3>
                  <p className={styles.movieDetailsText}>{film.overview}</p>
                  <h3 className={styles.movieDetailsTitleFilm}>Genres</h3>
                  <ul className={styles.movieDetailsGenresList}>
                    {loading ? (
                      <>
                        <Skeleton width="60%" height={20} duration={1.5} />
                        <Skeleton width="60%" height={20} duration={1.5} />
                      </>
                    ) : (
                      film.genres.map((genre) => (
                        <li className={styles.movieDetailsText} key={genre.id}>
                          {genre.name}
                        </li>
                      ))
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
  
          {/* Вбудував відеоплеєр */}
          <div className={styles.videoPlayerWrapper}>
            <h3 className={styles.movieDetailsTitleFilm}>Watch Trailer</h3>
            {/* <VideoPlayer filmId={film.id} /> */}
            <VideoPlayer />
          </div>
          {/* Вбудував відеоплеєр */}
          
          <nav className={styles.moreInfo}>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.btnLink, isActive && styles.moreInfoLinkActive)
              }
              to={"cast"}
              state={location.state}
            >
              Cast
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.btnLink, isActive && styles.moreInfoLinkActive)
              }
              to={"reviews"}
              state={location.state}
            >
              Reviews
            </NavLink>
          </nav>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    );
  };
  
  export default MovieDetailsPage;