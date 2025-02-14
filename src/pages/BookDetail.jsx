import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`https://gutendex.com/books/${id}`);
      const data = await response.json();
      setBook(data);
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === book?.id));
  }, [book]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, book]));
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.formats["image/jpeg"]} alt={book.title} />
      <p>Author: {book.authors.map((author) => author.name).join(", ")}</p>
      <p>Downloads: {book.download_count}</p>
      <p>Category: {book.subjects.join(", ")}</p>
      <p>Language: {book.languages.join(", ")}</p>
      <a href={book.formats["text/html"]}>Read book</a>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default BookDetail;
