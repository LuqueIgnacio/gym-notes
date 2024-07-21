import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function RutinaCabeceraItem(props) {
    const {ejercicio} = props
  return (
    <View>
        <Text className="text-xl font-bold">{ejercicio.name}</Text>
        <View className="flex-row justify-between">

            {ejercicio.lastTrain ? (
                <View>
                    <Text className="text-lg font-bold">Anterior</Text>
                    <View className="flex-row space-x-3">
                        <Text className="p-0.5 text-base">9 reps</Text>
                        <Text className="p-0.5 text-base">70kg</Text>
                    </View>
                </View>
            ): null}
            
            <View>
                <Text className="text-lg font-bold">Actual</Text>
                <View className="flex-row space-x-3">
                    <View className="flex-row bg-gray-100 rounded-lg ">
                        <TextInput className="p-0.5 text-base" placeholder='9' keyboardType='numeric' maxLength={3}></TextInput>
                        <Text className="p-0.5 text-base">reps</Text>
                    </View>
                    <View className="flex-row bg-gray-100 rounded-lg ">
                        <TextInput className="p-0.5 text-base" placeholder='72.5' keyboardType='numeric' maxLength={5}></TextInput>
                        <Text className="p-0.5 text-base"> kg</Text>
                    </View>
                </View>
            </View>
          
        </View>
      </View>
  )
}