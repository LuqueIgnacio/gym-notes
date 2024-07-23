import ModifyRutina from '@/components/rutina/ModifyRutina';
import { useState } from 'react';
import uuid from "react-native-uuid"

export default function EditarRutinaScreen() {
  
  const [ejercicios, setEjercicios] = useState(
  [
    {id: 1, name: "Press Banca", key: uuid.v4()},
    
  ])
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = useState(ejercicios.length)
  
  return(
    <ModifyRutina 
      ejerciciosState={[ejercicios, setEjercicios]} 
      cantidadEjerciciosSeleccionadosState={[cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados]} 
      onSave={() => console.log("el venao")}
    />
  )
}