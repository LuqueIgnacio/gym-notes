import BaseModal from '@/components/BaseModal';
import ItemListContainer from '@/components/ItemListContainer';
import BaseButton from '@/components/buttons/BaseButton';
import SaveButton from '@/components/buttons/SaveButton';
import TextButton from '@/components/buttons/TextButton';
import RutinaCabeceraItem from '@/components/rutina/RutinaCabeceraItem';
import {useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Modal, Button, Pressable } from 'react-native';


export default function AgregarRutinaCabeceraScreen() {
  const {rutina} = useLocalSearchParams()
  const router = useRouter()
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    navigation.setOptions({headerTitle: `Rutinas>${rutina}`})
  }, [])

  const data = [
    {name: "Press Banca", lastTrain: true},
    {name: "Press Militar"},
    {name: "Fondos", lastTrain: true},
    {name: "Remo"},
    {name: "Dominadas", lastTrain: true},
    {name: "Peso Muerto", lastTrain: true},
  ]

  return (
    <>
    <FlatList
      className="grow-0 h-full"
      data={data}
      renderItem={({item}) => {
        return (  
          <ItemListContainer>
            <RutinaCabeceraItem ejercicio={item}/>
          </ItemListContainer>
        )}}
      keyExtractor={(ejercicio) => ejercicio.name}
    />
    
    <View className="flex-row justify-center items-center rounded-full my-4">
      <SaveButton width={40} height={40} onPress={() => setShowModal(true)}/>
    </View>
    
    <BaseModal animationType='fade' visible={showModal}>
      <Text className="text-center font-bold text-base">¿Estás seguro que quieres salir sin guardar?</Text>
      <View className="flex-row mt-4 space-x-4">
        <View>
            <TextButton onPress={() => setShowModal(false)}>
              <Text className="font-bold text-base">No</Text>
            </TextButton>
        </View>
        <View>
          <TextButton onPress={() => router.back()}>
            <Text className="font-bold text-base">Salir</Text>
          </TextButton>
        </View>
      </View>
    </BaseModal>
    </>
  );
}
