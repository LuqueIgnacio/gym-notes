import { View, Text } from 'react-native'
import React from 'react'
import BaseButton from './BaseButton'
import PencilIcon from '../icons/PencilIcon'

export default function PencilButton(props) {
    const {width, height, onPress} = props
  return (
    <BaseButton>
        <PencilIcon width={width} height={height} onPress={onPress}></PencilIcon>
    </BaseButton>
  )
}