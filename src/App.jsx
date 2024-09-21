// import { DarkThemeToggle } from "flowbite-react";
//import { useState } from "react";
import { Layout } from "./components/shared/layout";
import { LoginPage } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Orders } from "./pages/orders";
import { Users } from "./pages/users";
import { Products } from "./pages/products";
import { AddProducts } from "./pages/add-products";
import { Carts } from "./pages/carts";
import { Inbox } from "./pages/inbox";

function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      //element: isAuthenticated ? <Navigate to="/home" /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />, // Redirect to home if authenticated
    },
    {
      path: "/home",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
      //element: isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/" />, // Show home if authenticated, else redirect to login
    },
    {
      path: "/orders",
      element: (
        <Layout>
          <Orders />
        </Layout>
      ),
    },
    {
      path: "/users",
      element: (
        <Layout>
          <Users />
        </Layout>
      ),
    },
    {
      path: "/products",
      element: (
        <Layout>
          <Products />
        </Layout>
      ),
    },
    {
      path: "/add-products",
      element: <AddProducts />,
    },
    {
      path: "/carts",
      element: (
        <Layout>
          <Carts />
        </Layout>
      ),
    },
    {
      path: "/inbox",
      element: (
        <Layout>
          <Inbox />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
