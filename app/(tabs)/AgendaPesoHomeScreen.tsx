import PesoItem from "@/components/agendaPeso/PesoItem"
import CirclePlusButton from "@/components/buttons/CirclePlusButton"
import React, { useEffect, useState } from "react"
import { View, FlatList } from "react-native"
import AgregarPesoModal from "@/components/agendaPeso/AgregarPesoModal"
import uuid from "react-native-uuid"
import { deletePeso, getLastSevenPesos, savePeso } from "@/services/PesoService"
import { PesoType } from "@/types/types"
import Toast from "react-native-toast-message"
import { showSuccesToast } from "@/helpers/Toasts"

export default function AgendaPesoHomeScreen(){
    //Es importante traer estos datos ordenados de menor a mayor
    const [pesos, setPesos] = useState<PesoType[]>([])
    const handleOnTrashButtonClick = async (index: number) => {
        try{
            await deletePeso(pesos[index].id)
            const newPesos = pesos.slice()
            newPesos.splice(index, 1)
            setPesos(newPesos)
        }catch(error){
            //TODO: Agregar feedback para el usuario
        }
    }
    const [modalVisible, setModalVisible] = useState(false)
    const onCancelButtonPress = () =>{
        setModalVisible(false)
    }
    const onSaveButtonPress = async (peso: number, fecha: Date) =>{
        try{
            const id = await savePeso({peso, fecha})
            const newPeso = {id: id, peso: peso, fecha: fecha}
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
            if(newPesos.length > 7) newPesos.splice(0, 1)
            setPesos(newPesos)
            setModalVisible(false)
            showSuccesToast("Peso agregado con éxito")
        }catch(error){

        }
        
    }

    useEffect( () =>{
        getLastSevenPesos().then(p => setPesos(p))
    }, [])
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