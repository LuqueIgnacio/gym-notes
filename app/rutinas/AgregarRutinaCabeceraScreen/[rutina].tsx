import BaseModal from '@/components/BaseModal';
import ItemListContainer from '@/components/ItemListContainer';
import BaseButton from '@/components/buttons/BaseButton';
import CircleCheckButton from '@/components/buttons/CircleCheckButton';
import SaveButton from '@/components/buttons/SaveButton';
import TextButton from '@/components/buttons/TextButton';
import RutinaCabeceraItem from '@/components/rutina/RutinaCabeceraItem';
import { showSuccesToast } from '@/helpers/Toasts';
import { getCurrentRutinaDetalleAndEjerciciosNames, getNotFinishedRutinaDetalles, getRutina, getRutinaEjercicioWithLastFinishedDetalle, saveAndFinishRutinaCabeceraAndDetalle, saveRutinaCabeceraAndDetalle } from '@/services/RutinasServices';
import { RutinaDetalleType, RutinaType } from '@/types/types';
import {useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Modal, Button, Pressable } from 'react-native';


export default function AgregarRutinaCabeceraScreen() {
  const {rutina: rutinaId} = useLocalSearchParams()
  const router = useRouter()
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [rutina, setRutina] = useState<RutinaType|null>(null)
  const [lastRutinaCabecera, setLastRutinaCabecera] = useState<RutinaDetalleType[]|null>([])
  const [ejerciciosName, setEjerciciosName] = useState<(string|null)[]>([])
  const [detalles, setDetalles] = useState<(RutinaDetalleType)[]>([])

  const onInputReps = (index: number, reps: number) =>{
    const newDetalles = detalles.slice()
    newDetalles[index].reps = reps
    setDetalles(newDetalles)
  }

  const onInputPeso = (index: number, peso: number) =>{
    const newDetalles = detalles.slice()
    newDetalles[index].peso = peso
    setDetalles(newDetalles)
  }

  const onSave = async () =>{
    try{
      await saveRutinaCabeceraAndDetalle(detalles, rutinaId)
      //TODO: Dar feedback al usuario sobre el registro guardado.
    }catch(error){
      //TODO: Dar feedback al usuario sobre el error.
    }
  }

  const onSaveAndFinish = async () =>{
    try{
      await saveAndFinishRutinaCabeceraAndDetalle(detalles, rutinaId)
      router.back()
    }catch(e){
      //TODO: Dar feedback al usuario sobre el error.
    }
  }

  useEffect(() => {
    const fechtData = async () =>{
      const fetchedRutina = await getRutina(rutinaId)
      const {nombreEjercicios, detalles: fetchedDetalles} = await getCurrentRutinaDetalleAndEjerciciosNames(rutinaId)
      const fetchLastRutinaCabecera = await getRutinaEjercicioWithLastFinishedDetalle(rutinaId)
      if(!fetchedRutina){
        return
      }
      navigation.setOptions({headerTitle: `Rutinas>${fetchedRutina.name}`})
      setRutina(fetchedRutina)
      setLastRutinaCabecera(fetchLastRutinaCabecera)
      setDetalles(fetchedDetalles.map(detalle => detalle))
      setEjerciciosName(nombreEjercicios)
    }
    fechtData()
  }, [])
  
  return (
    <>
    <FlatList
      className="grow-0 h-full"
      data={detalles}
      renderItem={(item) => {
        return (  
          <ItemListContainer>
            <RutinaCabeceraItem 
              ejercicioName={ejerciciosName.at(item.index)}
              currentDetalle={item.item} 
              lastDetalle={lastRutinaCabecera?.at(item.index)} 
              onInputReps={onInputReps}
              onInputPeso={onInputPeso}
              index={item.index}
            />
          </ItemListContainer>
        )}}
      keyExtractor={(ejercicio) => ejercicio.idEjercicio}
    />
    
    <View className="flex-row justify-center items-center rounded-full my-4">
      <SaveButton width={40} height={40} onPress={onSave}/>
      <CircleCheckButton width={40} height={40} onPress={onSaveAndFinish}/>
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
