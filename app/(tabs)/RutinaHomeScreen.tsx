import ItemListContainer from '@/components/ItemListContainer';
import CirclePlusButton from '@/components/buttons/CirclePlusButton';
import RutinaItem from '@/components/rutina/RutinaItem';
import {useRouter } from 'expo-router';
import { View, Text, Button, FlatList } from 'react-native';
import { rutinaRoutes } from '@/constants/Routes';
import {getAllRutinas, addRutina, deleteRutina} from '@/services/RutinasServices'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

export default function RutinaHomeScreen() {
  const router = useRouter()
  const [rutinas, setRutinas] = useAppContext()
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
