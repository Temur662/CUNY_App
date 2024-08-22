import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Redirect, Link } from 'expo-router';
const index = () => {
   const { session, loading } = useAuth();
   if (!session) {
    return <Redirect href={"/SignIn"} />
   }
   
  return (
    <Redirect href={"/(user)"}/>
  )
}

export default index