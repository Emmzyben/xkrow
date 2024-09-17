import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { account, ID } from '../backend/appwite'
import { useNavigation } from '@react-navigation/native';
import { DATABASE_ID, COLLECTION_ID_PROFILE } from '@env';
import { database, Query } from '../backend/appwite';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);

  const checkUser = async () => {
    try {
      const userData = await account.get(); 
      if (userData && userData.email) {
        setUser({ id: userData.$id, email: userData.email });
        console.log('User data fetched:', userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      // console.error('Error checking user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const register = async (email, phone, password) => {
    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
  
      const userId = ID.unique();
  
      await account.create(userId, email, password);
  
      await account.createEmailPasswordSession(email, password);
  
      await checkUser();
  
      const profileData = {
        user_id: userId,
        phone: phone,
      };
      await database.createDocument(DATABASE_ID, COLLECTION_ID_PROFILE, ID.unique(), profileData);
  
      console.log('Profile created successfully with user ID and phone number:', profileData);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;  
    }
  };
  

  const login = async (email, password) => {
    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      await account.createEmailPasswordSession(email, password); 
      await checkUser();
  
      if (!user) {
        // throw new Error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setUser(null);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  };
  

  const logout = async () => {
    try {
      await account.deleteSession('current'); 
      setUser(null);
      navigation.navigate('Login'); 
      console.log('Session destroyed.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // useEffect(() => {
  //   const handleAppStateChange = async (nextAppState) => {
  //     console.log(`AppState changed from ${appState} to ${nextAppState}`);
  //     if (nextAppState === 'background') {
  //       console.log('App went to background. Logging out...');
  //       await logout();
  //       console.log('logged out');
  //     }
  //     setAppState(nextAppState);
  //   };

  //   const subscription = AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [appState]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
