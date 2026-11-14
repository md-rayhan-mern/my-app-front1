import Products from "../features/products/pages/Products";
import About from "../views/About";

export const UniversalRoute = [
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "about",
    element: <About />,
  },
];
