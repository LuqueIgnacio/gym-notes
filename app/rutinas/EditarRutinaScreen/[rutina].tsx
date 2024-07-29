import ModifyRutina from '@/components/rutina/ModifyRutina';
import { useAppContext } from '@/hooks/useAppContext';
import { editRutina, getAllEjerciciosForDropwdown, getAllRutinas, getRutinaWithEjercicios, prepareDataForModifyRutinaComponent, prepareDataForSaveRutina } from '@/services/RutinasServices';
import { EjercicioDropdownType, EjercicioSeleccionado } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import uuid from "react-native-uuid"

export default function EditarRutinaScreen() {
  
  const [nombreRutina, setNombreRutina] = useState<string | null>("")
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState<EjercicioSeleccionado[]>([])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejerciciosSeleccionados.length)
  const [ejercicios, setEjercicios] = useState<EjercicioDropdownType[]>([])
  const [rutina, setRutina] = useAppContext()
  const params = useLocalSearchParams()

  const onSave = async () =>{
    //Llamar a editRutina
    await editRutina(prepareDataForSaveRutina({name: nombreRutina, id: params.rutina}, ejerciciosSeleccionados))
    setRutina(await getAllRutinas())
  }

  useEffect(() =>{
    const fechtData = async () =>{
      const rutinaWithEjercicios = await getRutinaWithEjercicios(params.rutina)
      if(!rutinaWithEjercicios){
        return
      }
      const {ejerciciosSeleccionados: newEjerciciosSeleccionados,
         ejerciciosDropdown} = prepareDataForModifyRutinaComponent(rutinaWithEjercicios, await getAllEjerciciosForDropwdown())
      setNombreRutina(rutinaWithEjercicios.name)
      setEjerciciosSeleccionados(newEjerciciosSeleccionados)
      setEjercicios(ejerciciosDropdown)
    }
    fechtData()
  }, [])
  
  return(
    <ModifyRutina 
      nombreRutinaState={[nombreRutina, setNombreRutina]}
      ejerciciosSeleccionadosState={[ejerciciosSeleccionados, setEjerciciosSeleccionados]} 
      cantidadEjerciciosSeleccionadosState={[cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados]}
      ejerciciosState={[ejercicios, setEjercicios]} 
      onSave={onSave}
    />
  )
}