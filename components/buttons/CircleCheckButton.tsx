import { View, Text } from 'react-native'
import React from 'react'
import BaseButton from './BaseButton'
import CircleCheckIcon from '../icons/CircleCheckIcon'

export default function CircleCheckButton(props) {
    const {width, height} = props
    return (
        <BaseButton onPress={props.onPress}>
            <CircleCheckIcon width={width} height={height}/>
        </BaseButton>
    )
}