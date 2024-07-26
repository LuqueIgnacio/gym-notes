import ModifyRutina from '@/components/rutina/ModifyRutina';
import { addEjercicio } from '@/services/EjercicioService';
import { getAllEjercicios } from '@/services/RutinasServices';
import { useEffect, useState } from 'react';
import uuid from "react-native-uuid"

export default function AgregarRutinaScreen() {
  
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejerciciosSeleccionados.length)
  const [ejercicios, setEjercicios] = useState([])

  useEffect(() =>{
    const fechtData = async () =>{
      let data = await getAllEjercicios()
      data = data.map( d => {
        d.title = d.name
        d.isSelected = false
        return d
      })
      console.log(data)
      setEjercicios(data)
    }
    fechtData()
  }, [])
  
  return(
    <ModifyRutina 
      ejerciciosSeleccionadosState={[ejerciciosSeleccionados, setEjerciciosSeleccionados]} 
      cantidadEjerciciosSeleccionadosState={[cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados]}
      ejerciciosState={[ejercicios, setEjercicios]} 
      onSave={() => console.log("gorriadooo")}
    />
  )
}
