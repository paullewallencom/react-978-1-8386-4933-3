import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Function to initialize state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;

    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });


  // Setter function
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

    } catch (error) {
      console.log(error);
    }
  };

  // return array of initialized state and setter function
  return [storedValue, setValue];  
}

export default useLocalStorage;
