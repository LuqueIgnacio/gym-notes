import ModifyRutina from '@/components/rutina/ModifyRutina';
import { useAppContext } from '@/hooks/useAppContext';
import { addEjercicio } from '@/services/EjercicioService';
import { addRutina, getAllEjercicios, getAllEjerciciosForDropwdown, getAllRutinas } from '@/services/RutinasServices';
import { useEffect, useState } from 'react';

export default function AgregarRutinaScreen() {
  
  const [nombreRutina, setNombreRutina] = useState("")
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejerciciosSeleccionados.length)
  const [ejercicios, setEjercicios] = useState([])
  const [rutina, setRutina] = useAppContext()

  const onSave = async () =>{
    const ejer = ejerciciosSeleccionados.slice().map( e => {
      delete e.key
      return e
    })
    await addRutina({name: nombreRutina, ejercicios: ejer})
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
