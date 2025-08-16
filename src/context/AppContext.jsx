
// context/AppContext.jsx - Context principal de l'application
import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload };
    
    case 'ADD_ACTIVITY':
      return { 
        ...state, 
        activities: [action.payload, ...state.activities] 
      };
    
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.id ? action.payload : activity
        )
      };
    
    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== action.payload)
      };
    
    case 'SET_SEARCH_FILTERS':
      return { ...state, searchFilters: action.payload };
    
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    
    default:
      return state;
  }
};

const initialState = {
  activities: [],
  searchFilters: {},
  userLocation: null,
  loading: false,
  error: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { AppContext };
