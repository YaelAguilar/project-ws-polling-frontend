import { createContext, useState, useEffect, ReactNode } from 'react';

interface UserState {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserState | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
    setLoaded(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('userToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  if (!loaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
