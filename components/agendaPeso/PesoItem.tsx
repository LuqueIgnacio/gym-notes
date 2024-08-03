import { View, Text } from 'react-native'
import React from 'react'
import ItemListContainer from '../ItemListContainer'
import TrashButton from '../buttons/TrashButton'

export default function PesoItem({peso, pesoTextcolor, index, onTrashButtonClick}) {
  return (
    <ItemListContainer>
        <View className="flex-row justify-around  items-center px-2">
            <Text className={"text-lg font-bold w-3/12 " + pesoTextcolor} style={{width: "25%"}}>{peso.peso}</Text>
            <Text className="text-lg " style={{width: "70%"}}>
              {peso.fecha.toLocaleDateString("en-GB") + "-" + peso.fecha.toLocaleTimeString()}
            </Text>
            <View className="">
                <TrashButton width={30} height={30} onPress={() => onTrashButtonClick(index)}/>
            </View>
        </View>
    </ItemListContainer>
  )
}