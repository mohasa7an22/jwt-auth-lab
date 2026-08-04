import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
function IsAdmin(children) {
    const {user, loading} = useAuth()

    if(loading) return <p>...Loading</p>
    
    if(!user || user.role !== "admin") {
        return <Navigate to ="/dashboard" />
    }
  return children

  
}

export default IsAdmin
