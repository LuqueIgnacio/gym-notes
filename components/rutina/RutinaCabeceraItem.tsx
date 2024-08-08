import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function RutinaCabeceraItem({index, ejercicioName, currentDetalle, lastDetalle, onInputReps, onInputPeso}) {
    const [peso, setPeso] = useState<string>(currentDetalle.peso)

    const savePeso = () => {
        console.log("onSavePeso")
        const floatRegex = /^-?\d*(\.\d+)?$/;
        if(floatRegex.test(peso)){
            onInputPeso(index, parseFloat(peso))
        }else{
            setPeso("")
            onInputPeso(index, null)
        } 
    };

    const saveReps = (text) => {
        let number = parseInt(text)
        if(isNaN(number)){
            onInputReps(index, null)
        }else{
            onInputReps(index, parseInt(text))
        }
    }
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
                            onChangeText={(text) => saveReps(text)}
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
                            value={peso?.toString()}
                            onChangeText={(text) => setPeso(text)}
                            onEndEditing={savePeso}
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