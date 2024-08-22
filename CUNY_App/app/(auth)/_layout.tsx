import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'
import { useLogin } from '@/providers/LoginProvider'

const AuthLayout = () => {
    const { login } = useLogin();
    
    if ( login ) {
      return <Redirect href={'/(user)'} />;
    }
  
    return <Stack />;
}

export default AuthLayout