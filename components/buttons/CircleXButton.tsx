import React from 'react'
import BaseButton from './BaseButton'
import CircleXIcon from '../icons/CircleXIcon'

export default function CircleXButton({width, height, onPress}) {
  return (
    <BaseButton onPress={onPress}>
        <CircleXIcon width={width} height={height}/>
    </BaseButton>
  )
}