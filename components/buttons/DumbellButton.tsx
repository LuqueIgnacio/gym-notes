import { View, Text } from 'react-native'
import React from 'react'
import BaseButton from './BaseButton'
import DumbellIcon from '../icons/DumbellIcon'

export default function DumbellButton(props) {
    const {width, height} = props
  return (
    <BaseButton onPress={props.onPress}>
        <DumbellIcon width={width} height={height}></DumbellIcon>
    </BaseButton>
  )
}