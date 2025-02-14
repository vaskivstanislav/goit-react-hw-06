import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { getFilmsSearch } from "../../js/films-api"; // Актуальний API для пошуку фільмів
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = searchQuery || "popular"; // Якщо немає запиту, шукаємо популярні фільми
        const response = await getFilmsSearch(query);
        
        setSearchResults(response.results);
        if (response.total_results === 0) {
          toast.error("No results found.");
        } else {
          toast.success(`Found ${response.total_results} films.`);
        }
      } catch (error) {
        console.error("Error fetching films:", error);
        toast.error("Something went wrong, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]); 
  const handleSearchSubmit = (query) => {
    setSearchParams({ search: query }); 
  };

  return (
    <main>
      <section className={styles.moviesSearch}>
        <SearchBox onSubmit={handleSearchSubmit} />
        <Toaster position="top-right" reverseOrder={false} />

        {loading ? (
          <div className={styles.loadingContainer}>
            <p>Loading...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <MovieList filmsList={searchResults} />
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </main>
  );
};

export default MoviesPage;