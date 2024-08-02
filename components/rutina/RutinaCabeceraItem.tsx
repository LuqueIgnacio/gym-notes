import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function RutinaCabeceraItem({index, ejercicioName, currentDetalle, lastDetalle, onInputReps, onInputPeso}) {
    return (
    <View>
        <Text className="text-xl font-bold">{ejercicioName}</Text>
        <View className="flex-row justify-between">

            {lastDetalle ? (
                <View>
                    <Text className="text-lg font-bold">Anterior</Text>
                    <View className="flex-row space-x-3">
                        <Text className="p-0.5 text-base">{`${lastDetalle.reps} reps`}</Text>
                        <Text className="p-0.5 text-base">{`${lastDetalle.peso}kg`}</Text>
                    </View>
                </View>
            ): null}
            
            <View>
                <Text className="text-lg font-bold">Actual</Text>
                <View className="flex-row space-x-3">
                    <View className="flex-row bg-gray-100 rounded-lg ">
                        <TextInput 
                            className="p-0.5 text-base" 
                            placeholder='9' 
                            keyboardType='numeric' 
                            maxLength={3}
                            value={currentDetalle.reps?.toString()}
                            onChangeText={(text) => onInputReps(index, parseFloat(text))}
                        >
                            </TextInput>
                        <Text className="p-0.5 text-base">reps</Text>
                    </View>
                    <View className="flex-row bg-gray-100 rounded-lg ">
                        <TextInput 
                            className="p-0.5 text-base" 
                            placeholder='72.5' 
                            keyboardType='numeric' 
                            maxLength={5}
                            value={currentDetalle.peso?.toString()}
                            onChangeText={(text) => onInputPeso(index, parseFloat(text))}
                        >
                        </TextInput>
                        <Text className="p-0.5 text-base"> kg</Text>
                    </View>
                </View>
            </View>
          
        </View>
      </View>
  )
}