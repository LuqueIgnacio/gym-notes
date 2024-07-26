import ItemListContainer from '@/components/ItemListContainer';
import CirclePlusButton from '@/components/buttons/CirclePlusButton';
import RutinaItem from '@/components/rutina/RutinaItem';
import {useRouter } from 'expo-router';
import { View, Text, Button, FlatList } from 'react-native';
import { rutinaRoutes } from '@/constants/Routes';
import {getAllRutinas, addRutina, deleteRutina} from '@/services/RutinasServices'
import { useEffect, useState } from 'react';

export default function RutinaHomeScreen() {
  console.log( getAllRutinas())
  const router = useRouter()
  const rutina = [
    {id: 1, name: "Torso"},
    {id: 2, name: "Pierna"},
    {id: 3, name: "Espalda"},
  ]
  const [datos, setDatos] = useState([])
  useEffect(() =>{
    const fetchData = async () =>{
      //await addRutina()
      //await deleteRutina()
      const newDatos = await getAllRutinas()
      
      console.log(newDatos)
    }
    fetchData()
  }, [])

  return (
    <>
    <FlatList
      className="grow-0 "
      data={rutina}
      renderItem={({item}) => {
        return(
          <ItemListContainer style="flex-row justify-between items-center">
            <RutinaItem rutina={item}></RutinaItem>
          </ItemListContainer>
        )
      }}
    />
    <View className="flex-row justify-center mt-5">
      <CirclePlusButton width={40} height={40} onPress={() => router.push(rutinaRoutes.agregarRutina)}/>
    </View>
    </>
  );
}
