import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState(searchTerm || "");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://gutendex.com/books/?search=${encodeURIComponent(
            searchTerm
          )}&page=${page}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setResults(Array.isArray(data.results) ? data.results : []);
        setTotalPages(
          Number.isInteger(data.total_pages) ? data.total_pages : 1
        );
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search/${encodeURIComponent(searchInput)}?page=1`;
  };

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <ul>
        {results.map((result) =>
          result.id && result.title ? (
            <li key={result.id}>{result.title}</li>
          ) : null
        )}
      </ul>
      <div>
        {page > 1 && (
          <Link
            to={`/search/${encodeURIComponent(searchTerm)}?page=${page - 1}`}
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            to={`/search/${encodeURIComponent(searchTerm)}?page=${page + 1}`}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
