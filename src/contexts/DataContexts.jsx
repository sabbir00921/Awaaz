import React, { createContext, useState } from 'react'
const DataContext = createContext();
const DataProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <DataContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      {children}
    </DataContext.Provider>
  )
}

export {DataContext, DataProvider}
