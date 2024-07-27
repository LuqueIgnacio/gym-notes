import ModifyRutina from '@/components/rutina/ModifyRutina';
import { useAppContext } from '@/hooks/useAppContext';
import { editRutina, getAllEjerciciosForDropwdown, getAllRutinas, getRutinaWithEjercicios, prepareDataForModifyRutinaComponent, prepareDataForSaveRutina } from '@/services/RutinasServices';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import uuid from "react-native-uuid"

export default function EditarRutinaScreen() {
  
  const [nombreRutina, setNombreRutina] = useState("")
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejerciciosSeleccionados.length)
  const [ejercicios, setEjercicios] = useState([])
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