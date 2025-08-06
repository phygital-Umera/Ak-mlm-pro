import React, {ReactNode, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {Token, User, Customer} from '@/types';
import {QUERY_KEYS} from '@/lib/react-query/QueryKeys';
import {jwtDecode} from 'jwt-decode';

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>();
  const [token, setToken] = useState<Token | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const localToken = JSON.parse(
      localStorage.getItem(QUERY_KEYS.TOKEN) || 'null',
    );
    const localCustomer = JSON.parse(
      localStorage.getItem(QUERY_KEYS.CUSTOMER) || 'null',
    );

    if (localToken) {
      const decodedToken: User = jwtDecode(localToken.accessToken);

      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(QUERY_KEYS.TOKEN);
        setToken(null);
        setUser(null);
        setRole(null);
        setIsSuperAdmin(false);
        setIsAuthenticated(false);
        setCustomer(null);
      } else {
        setToken(localToken);
        setUser(decodedToken);
        setRole(decodedToken.role);
        setIsAuthenticated(true);
        setCustomer(localCustomer);
      }
    }
  }, []);

  // Value of the context
  const contextValue = {
    user,
    setUser,
    role,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    isSuperAdmin,
    setIsSuperAdmin,
    customer,
    setCustomer,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
