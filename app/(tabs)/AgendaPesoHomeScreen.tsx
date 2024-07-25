import PesoItem from "@/components/agendaPeso/PesoItem"
import CirclePlusButton from "@/components/buttons/CirclePlusButton"
import React, { useState } from "react"
import { View, FlatList } from "react-native"
import AgregarPesoModal from "@/components/agendaPeso/AgregarPesoModal"
import uuid from "react-native-uuid"

export default function AgendaPesoHomeScreen(){
    //Es importante traer estos datos ordenados de menor a mayor
    const [pesos, setPesos] = useState(
        [
            {id: "1", peso: 82, fecha: new Date("2024-7-20")},
            {id: "2", peso: 82.6, fecha: new Date("2024-7-21")},
            {id: "3", peso: 82.5, fecha: new Date("2024-7-22")},
            {id: "4", peso: 83, fecha: new Date("2024-7-23")},
        ]
    )
    const handleOnTrashButtonClick = (index: number) => {
        const newPesos = pesos.slice()
        newPesos.splice(index, 1)
        setPesos(newPesos)
    }
    const [modalVisible, setModalVisible] = useState(false)
    const onCancelButtonPress = () =>{
        setModalVisible(false)
    }
    const onSaveButtonPress = (peso, fecha) =>{
        if(fecha.getTime() > new Date().getTime()){
            return
        }
        const newPeso = {id: uuid.v4(), peso: peso, fecha: fecha}
        const newPesos = pesos.slice()
        let index = newPesos.length-1
        for(let i=index; i>=0; i--){
            if(fecha.getTime() < newPesos[i].fecha.getTime()){
                index = i
            }else{
                break
            }
        }

        if(index === newPesos.length-1 && fecha.getTime() > newPesos[index].fecha.getTime()){
            index++
        }
        newPesos.splice(index, 0, newPeso)
        setPesos(newPesos)
    }
    return(
        <>
        <FlatList
            className="grow-0"
            data={pesos}
            inverted={true}
            keyExtractor={pesos => pesos.id}
            renderItem={({item, index}) =>{
                let color = ""
                if(index > 0){
                    if(pesos[index].peso > pesos[index - 1].peso){
                        color = "color-green-500"
                    }else{
                        color = "color-red-700"
                    }
                }
                return(
                    <PesoItem peso={item} pesoTextcolor={color} index={index} onTrashButtonClick={handleOnTrashButtonClick}/>
                )
            }}
        />
        

        <View className="flex-row justify-center mt-4">
            <CirclePlusButton width={40} height={40} onPress={() => setModalVisible(true)}/>
        </View>
        {modalVisible ? (
            <AgregarPesoModal onCancelButtonPress={onCancelButtonPress} onSaveButtonPress={onSaveButtonPress}/>
        ): null}
        
        </>
    )
}