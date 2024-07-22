import React from 'react'
import BaseButton from './BaseButton'
import CirclePlusIcon from '../icons/CirclePlusIcon'

export default function CirclePlusButton({width, height, onPress}) {
  return (
    <BaseButton style={"rounded-full"} onPress={onPress}>
        <CirclePlusIcon width={width} height={height}/>
    </BaseButton>
  )
}