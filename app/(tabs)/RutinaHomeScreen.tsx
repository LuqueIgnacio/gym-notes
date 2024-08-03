import ItemListContainer from '@/components/ItemListContainer';
import CirclePlusButton from '@/components/buttons/CirclePlusButton';
import RutinaItem from '@/components/rutina/RutinaItem';
import {useRouter } from 'expo-router';
import { View, Text, Button, FlatList } from 'react-native';
import { rutinaRoutes } from '@/constants/Routes';
import {getAllRutinas, addRutina, deleteRutina} from '@/services/RutinasServices'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { showSuccesToast } from '@/helpers/Toasts';

export default function RutinaHomeScreen() {
  const router = useRouter()
  const [rutinas, setRutinas] = useAppContext()
  const onTrashButtonClick = async (rutina) =>{
    try{
      await deleteRutina(rutina)
      const newRutinas = rutinas.slice()
      const index = newRutinas.findIndex(r => r.id === rutina.id)
      newRutinas.splice(index, 1)
      setRutinas(newRutinas)
      showSuccesToast("Rutina eliminada con éxito")
    }catch(error){
      //TODO: dar feedback al usuario cuando ocurre un error
    }
  }
  useEffect(() =>{
    getAllRutinas().then(fetchedRutinas => setRutinas(fetchedRutinas))
  }, [])

  return (
    <>
    <FlatList
      className="grow-0 "
      data={rutinas}
      keyExtractor={rutina => rutina.id}
      renderItem={({item}) => {
        return(
          <ItemListContainer style="flex-row justify-between items-center">
            <RutinaItem rutina={item} onTrashButtonClick={onTrashButtonClick}></RutinaItem>
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
