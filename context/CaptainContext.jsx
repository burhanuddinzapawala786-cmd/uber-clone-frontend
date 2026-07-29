import React, { createContext , useState } from 'react'
export const CaptainContextGlobal = createContext()

const CaptainContext = ({children}) => {
    const [captaindata, setcaptaindata] = useState(null)

  return (
    <div>
      <CaptainContextGlobal.Provider value = {{captaindata , setcaptaindata}}>
        {children}
      </CaptainContextGlobal.Provider>
    </div>
  )
}

export default CaptainContext
