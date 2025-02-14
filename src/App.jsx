import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import BookDetail from "./pages/BookDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import SearchResults from "./components/SearchResults";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/book/:id", element: <BookDetail /> },
      { path: "/categories", element: <Categories /> },
      { path: "/category/:category", element: <CategoryDetail /> },
      { path: "/search/:searchTerm", element: <SearchResults /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
