//https://whataboutcoding.com/rtk-query-toolkit/

import React from "react";
import Read from "./components/Read";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./pages/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AddEdit from "./pages/AddEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Read />,
      },
      {
        path: "/create",
        element: <AddEdit />,
      },
      {
        path: "/edit/:id",
        element: <AddEdit />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
