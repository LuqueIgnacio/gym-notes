import { View, Text } from 'react-native'
import React from 'react'
import BaseButton from './BaseButton'
import TrashIcon from '../icons/TrashIcon'

export default function TrashButton(props) {
    const {width, height} = props
  return (
    <BaseButton>
        <TrashIcon width={width} height={height}></TrashIcon>
    </BaseButton>
  )
}