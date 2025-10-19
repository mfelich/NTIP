import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductsView from "./pages/ProductsView"
import UserDetails from "./pages/UserDetails"
import ProductDetails from "./pages/ProductDetails"
import { useEffect, useState } from "react";
import UsersView from "./pages/UsersView";

function App() {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (token && userData) {
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    } catch (err) {
      handleLogout();
    }
  }
}, []);

  const handleLogin = (user, token) => {
    localStorage.setItem("user",JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <BrowserRouter>
        <Header 
        username={user?.username}
        onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<ProductsView />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-view/" element={isAuthenticated ?(<UsersView />) : (<LoginForm onLogin={handleLogin} />)} />
          <Route path="/user-profile/:userId" element={isAuthenticated ?(<UserDetails />) : (<LoginForm onLogin={handleLogin} />)} />
          <Route path="/product-details/:productId" element={isAuthenticated ?(<ProductDetails />) : (<LoginForm onLogin={handleLogin} />)} />
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
