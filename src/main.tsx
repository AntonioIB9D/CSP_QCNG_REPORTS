import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./Views/Dashboard.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";

//Query Client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/csp",
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </QueryClientProvider>
);
