import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Redirect, Link } from 'expo-router';
import { useLogin } from '@/providers/LoginProvider';
const index = () => {
   const { login } = useLogin()
   if ( !login ) {
    return <Redirect href={"/SignIn"} />
   }
   
  return (
    <Redirect href={"/(user)"}/>
  )
}

export default index