import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import WriteBlog from './pages/WriteBlog';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [authUser, setAuthUser] = useState(() => {
    // Optionally try to load user from localStorage for session persistence
    const username = window.localStorage.getItem("username");
    return username ? { username } : null;
  });

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // If user logs in/out, update state AND localStorage for session resilience
  const handleLogin = (userObj) => {
    setAuthUser(userObj);
    if (userObj?.username)
      window.localStorage.setItem("username", userObj.username);
    if (userObj?.token)
      window.localStorage.setItem("token", userObj.token);
  };

  const handleLogout = () => {
    setAuthUser(null);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          user={authUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/write" element={<WriteBlog user={authUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
