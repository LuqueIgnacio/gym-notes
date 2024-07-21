import React from 'react'
import BaseButton from './BaseButton'
import SaveIcon from '../icons/SaveIcon'

export default function SaveButton(props) {
    const {width, height, onPress} = props
    return (
    <BaseButton onPress={onPress}>
        <SaveIcon width={width} height={height}/>
    </BaseButton>
    )
}