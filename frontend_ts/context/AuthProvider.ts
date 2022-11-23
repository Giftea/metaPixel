import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  // const handle = localStorage.getItem("lens_handle");
  // if(!auth.lens_handle && handle){
  //   setAuth({lens_handle: handle})
  // }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
