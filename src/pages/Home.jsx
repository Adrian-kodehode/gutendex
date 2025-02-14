import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookList from "../components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      const query = new URLSearchParams(location.search).get("search") || "";
      try {
        const response = await fetch(
          `https://gutendex.com/books?search=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [location.search]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default Home;
