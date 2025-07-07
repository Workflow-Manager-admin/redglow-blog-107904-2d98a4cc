import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogEditor from './pages/BlogEditor';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [authUser, setAuthUser] = useState(
    () => {
      const saved = localStorage.getItem("user");
      try { return saved ? JSON.parse(saved) : null; } catch { return null; }
    }
  );

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Handle login/logout for global auth state (synced for Navbar and Editor)
  const handleLogin = (userObj, token = null) => {
    setAuthUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    if (token) localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          authUser={authUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/write" element={
              authUser
                ? <BlogEditor currentUser={authUser} />
                : <div style={{ padding: 60, textAlign: "center", color: "#e63946", fontWeight: 700 }}>
                    You must be logged in to write a blog.
                  </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
