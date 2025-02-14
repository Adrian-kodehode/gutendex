import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";

const CategoryDetail = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gutendex.com/books?topic=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data.results || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Books</h1>
      {loading ? <p>Loading...</p> : <BookList books={books} />}
    </div>
  );
};

export default CategoryDetail;
