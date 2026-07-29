import React, { createContext, useState } from 'react'
export const UserContextGlobal = createContext();



const UserContext = ({children}) => {
  const [userdata, setUserdata] = useState(null);
  return (
    <div>
      <UserContextGlobal.Provider value = {{ userdata, setUserdata }}>

    {children}

      </UserContextGlobal.Provider>
    </div>
  )
}

export default UserContext
