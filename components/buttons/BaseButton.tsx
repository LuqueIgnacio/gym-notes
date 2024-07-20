import { Pressable } from 'react-native'
import React, { useState } from 'react'

export default function BaseButton(props) {
    const [styles, setStyles] = useState("p-1 rounded-lg bg-gray-50")
  return (
    <Pressable 
        className={styles}
        onPress={props.onPress}                   
        onPressIn={() => {setStyles("p-1 rounded-lg bg-gray-100")}} 
        onPressOut={() => {setStyles("p-1 rounded-lg bg-gray-50")}}>
            {props.children}
    </Pressable>
  )
}