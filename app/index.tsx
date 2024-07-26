import React from 'react'
import { Redirect } from 'expo-router'
import { rutinaRoutes } from '@/constants/Routes'


export default function index() {
    
  return (
    <Redirect href={rutinaRoutes.rutinaHome}/>
  )
}