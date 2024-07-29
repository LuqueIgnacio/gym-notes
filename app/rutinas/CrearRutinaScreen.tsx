import ModifyRutina from '@/components/rutina/ModifyRutina';
import { useAppContext } from '@/hooks/useAppContext';
import { addEjercicio } from '@/services/EjercicioService';
import { addRutina, getAllEjercicios, getAllEjerciciosForDropwdown, getAllRutinas, prepareDataForSaveRutina } from '@/services/RutinasServices';
import { EjercicioDropdownType, EjercicioSeleccionado } from '@/types/types';
import { useEffect, useState } from 'react';

export default function AgregarRutinaScreen() {
  
  const [nombreRutina, setNombreRutina] = useState<string | null>("")
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState<EjercicioSeleccionado[]>([])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejerciciosSeleccionados.length)
  const [ejercicios, setEjercicios] = useState<EjercicioDropdownType[]>([])
  const [rutina, setRutina] = useAppContext()

  const onSave = async () =>{
    await addRutina( prepareDataForSaveRutina({name: nombreRutina}, ejerciciosSeleccionados))
    setRutina(await getAllRutinas())
  }
  
  useEffect(() =>{
    getAllEjerciciosForDropwdown().then( ejerciciosDropdown => setEjercicios(ejerciciosDropdown))
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
