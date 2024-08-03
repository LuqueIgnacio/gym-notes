import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import BaseModal from '../BaseModal'
import CircleXButton from '../buttons/CircleXButton'
import CircleCheckButton from '../buttons/CircleCheckButton'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

export default function AgregarPesoModal({onCancelButtonPress, onSaveButtonPress}) {
    const currentDate = new Date()
    const [peso, setPeso] = useState(0)
    const [date, setDate] = useState(currentDate)
    const onChangeDate = (event, selectedDate) =>{
        setDate(selectedDate)
    }
    const showDatePicker = () =>{
        DateTimePickerAndroid.open(
            {
            value: date,
            onChange: onChangeDate,
            mode: 'date',
            maximumDate: currentDate
            })
    }
    return (
        <BaseModal >
            <Text className="text-lg font-bold">Agregar Peso</Text>
            <View className="flex-row justify-evenly w-full mt-2">
                <View className="flex-row items-center space-x-1">
                    <Text className="text-base font-bold">Peso:</Text>
                    <TextInput className="text-base" placeholder="80" keyboardType="numeric" onChangeText={(value) => setPeso(parseFloat(value))}/>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Text className="text-base font-bold">Fecha:</Text>
                    <View>
                        <Pressable onPress={showDatePicker}>
                            <Text className="text-base">
                                {date.toLocaleDateString("en-GB")}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View className="flex-row justify-center mt-2">
                <CircleXButton width={35} height={35} onPress={onCancelButtonPress}/>
                <CircleCheckButton width={35} height={35} onPress={() => onSaveButtonPress(peso, date)}/>
            </View>
        </BaseModal>

    )
}