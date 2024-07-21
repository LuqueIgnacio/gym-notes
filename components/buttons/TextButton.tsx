import {TouchableOpacity } from 'react-native'
import React from 'react'

export default function TextButton({children, onPress}) {
  return (
    <TouchableOpacity className="bg-gray-200 rounded-lg p-2" onPress={onPress}>
        {children}
    </TouchableOpacity>
  )
}