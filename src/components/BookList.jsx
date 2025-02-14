import { Link } from "react-router-dom";

const BookList = ({ books }) => (
  <ul>
    {books.map((book) => (
      <li key={book.id || book.title}>
        {book.id ? (
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        ) : (
          <span>{book.title}</span>
        )}
      </li>
    ))}
  </ul>
);

export default BookList;
