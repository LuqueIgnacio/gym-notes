import { Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function BaseButton(props) {

  return (
    <TouchableOpacity 
        className={"p-1 rounded-xl bg-gray-50 " + props.style}
        onPress={props.onPress}                   
       >
            {props.children}
    </TouchableOpacity>
  )
}