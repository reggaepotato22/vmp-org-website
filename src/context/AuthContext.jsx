import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ==============================================================================
// AUTHENTICATION CREDENTIALS
// ==============================================================================
// ⚠️ SECURITY WARNING: This is for DEMO purposes only!
// In production, use proper backend authentication with:
// - Secure password hashing (bcrypt, argon2)
// - JWT tokens
// - Session management
// - HTTPS only
// ==============================================================================

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'VMP@2025' // Change this immediately!
};

const AUTH_STORAGE_KEY = 'vmp_auth_token';
const USER_STORAGE_KEY = 'vmp_user';

export const AuthProvider = ({ children }) => {
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored === 'true';
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
  });

  // Persist authentication state to localStorage
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated.toString());
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [isAuthenticated, user]);

  /**
   * Login function
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{success: boolean, message: string}>}
   */
  const login = async (username, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validate credentials
      if (username === ADMIN_CREDENTIALS.username && 
          password === ADMIN_CREDENTIALS.password) {
        
        const userData = {
          username: username,
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful:', userData);
        return { success: true, message: 'Login successful' };
      } else {
        console.log('❌ Login failed: Invalid credentials');
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    console.log('✅ Logout successful');
  };

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const checkAuth = () => {
    return isAuthenticated;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};