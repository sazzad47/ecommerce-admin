import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Customers,
  Orders,
  Properties,
  Category,
  Product,
  Login,
  Settings,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { PrivateRoute, Flash } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/props"
          element={
            <PrivateRoute>
              <Properties />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Flash>
              <Login />
            </Flash>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
