import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const useAuth = () => {
  const value = useContext(AuthContext)
  return value
}

export default useAuth
