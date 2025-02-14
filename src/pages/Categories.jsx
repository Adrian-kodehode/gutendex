import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

const Categories = () => (
  <div>
    <h1>Categories</h1>
    <ul>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Categories;
