
import ItemListContainer from '@/components/ItemListContainer';
import CircleCheckButton from '@/components/buttons/CircleCheckButton';
import CirclePlusButton from '@/components/buttons/CirclePlusButton';
import EjercicioRutinaItem from '@/components/rutina/EjercicioRutinaItem';
import { useState } from 'react';
import { View, TextInput, FlatList} from 'react-native';
import uuid from "react-native-uuid"

export default function AgregarRutinaScreen() {
  
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(1)
  const [ejercicios, setEjercicios] = useState(
  [
    {id: 1, name: "Press Banca", key: uuid.v4()},
    
  ])
  const [data, setData] = useState([
    {id: 1, title: "Press Banca", isSelected: true},
    {id: 2, title: "Press Militar", isSelected: false},
    {id: 3, title: "Fondos", isSelected: false},
    {id: 4, title: "Dominadas", isSelected: false},
  ])

  const handleOnSelect = (index: number, ejercicio) => {
    const newEjercicios = ejercicios.slice(0)
    const newData = data.slice(0)
    let newCantidadEjerciciosSeleccionados = cantidadEjerciciosSeleccionados + 1
    newEjercicios[index] = {id: ejercicio.id, name:ejercicio.name, key: ejercicios[index].key}
    newData[newData.findIndex((item) => item.id === ejercicio.id)].isSelected = true
    if(ejercicios[index].id){
      newData[newData.findIndex((item) => item.id === ejercicios[index].id)].isSelected = false
      newCantidadEjerciciosSeleccionados--
    }
    setEjercicios(newEjercicios)
    setData(newData)
    setCantidadEjerciciosSeleccionados(newCantidadEjerciciosSeleccionados)
  }

  const deleteItem = (index: number) => {
    const newEjercicios = ejercicios.slice(0)
    const newData = data.slice(0)
    newEjercicios.splice(index, 1)
    if(ejercicios[index].name){
      newData[newData.findIndex((item) => item.id === ejercicios[index].id)].isSelected = false
      setCantidadEjerciciosSeleccionados(cantidadEjerciciosSeleccionados - 1)
    }
    setEjercicios(newEjercicios)
    setData(newData)
    
  }

  const addItem = () =>{
    const newEjercicios = ejercicios.slice(0)
    newEjercicios.push({id: null, name: "", key: uuid.v4()})
    setEjercicios(newEjercicios)
  }

  const areButtonsDisabled = cantidadEjerciciosSeleccionados === data.length

  return (
    <>
    <View>
      <ItemListContainer className="flex-row justify-center mx-5 mt-5 bg-gray-50 ">
        <View>
          <TextInput className="text-base text-center font-bold" placeholder='Nombre Rutina' textAlign='center' maxLength={20} ></TextInput>
        </View>
      </ItemListContainer>
    </View>

    <FlatList
      className="flex grow-0"
      data={ejercicios}
      keyExtractor={item => item.key}
      renderItem={ ({index}) => {
        return(
          <EjercicioRutinaItem index={index} data={data} ejercicios={ejercicios} deleteItem={deleteItem} handleOnSelect={handleOnSelect} disabled={areButtonsDisabled}/>
        )}}
    />
    
      <View className="flex-row justify-center mb-5 mt-4">
        {(ejercicios.length != data.length) ? (
          <CirclePlusButton width={40} height={40} onPress={addItem}/>
        ): null}
        <CircleCheckButton width={40} height={40}/>
      </View>
    
    </>
  );
}
