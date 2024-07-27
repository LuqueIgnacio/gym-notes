import db from "../db/database"
import { Users, Rutina, Ejercicio, RutinaToEjercicio } from "@/db/schema"
import { eq } from "drizzle-orm"
import uuid from "react-native-uuid"

export async function getAllRutinas(){
    return await db.select().from(Rutina)
}

export async function getRutinaWithEjercicios(id){
    const rutinaEjercicios = await db.query.Rutina.findFirst({
        where: eq(Rutina.id, id),
        with: {
            rutinaToEjercicio: {
                with: {
                    ejercicio: true
                }
            }
        }
    })
    const ejercicios = rutinaEjercicios?.rutinaToEjercicio.map(e => e.ejercicio)
    return {id: rutinaEjercicios?.id, name: rutinaEjercicios?.name, ejercicios: ejercicios}
}

export async function addRutina(rutina){
    await db.insert(Rutina).values({id: rutina.id, name: rutina.name})
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function editRutina(rutina){
    await db.delete(RutinaToEjercicio).where(eq(RutinaToEjercicio.rutinaId, rutina.id))
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function deleteRutina(rutina){
    return await db.delete(Rutina).where(eq(Rutina.id, rutina.id)) 
}

export async function getAllEjercicios(){
    return await db.select().from(Ejercicio)
}

export async function getAllEjerciciosForDropwdown() {
    let ejercicios = await db.select().from(Ejercicio)
    ejercicios = ejercicios.map( e => {
        e.title = e.name
        e.isSelected = false
        return e
    })
    return ejercicios
}

export function prepareDataForModifyRutinaComponent(rutinaWithEjercicios, ejerciciosDropdown){
    const newEjerciciosSeleccionados = rutinaWithEjercicios.ejercicios?.map(e => {
        e.key = e.id
        return e
    })
    ejerciciosDropdown = ejerciciosDropdown.map(e => {
        e.isSelected = false
        e.title = e.name
        return e
      })
      newEjerciciosSeleccionados.forEach(es =>{
        const index = ejerciciosDropdown.findIndex(e => e.id === es.id)
        ejerciciosDropdown[index].isSelected = true
    })

    return {ejerciciosSeleccionados: newEjerciciosSeleccionados, ejerciciosDropdown: ejerciciosDropdown}
}

export function prepareDataForSaveRutina(rutina, ejercicios){
    let newEjercicios
    if(rutina.id){
        newEjercicios = ejercicios.slice().map( e => {
            return {ejercicioId: e.id, rutinaId: rutina.id}
        })
    }else{
        const rutinaId = uuid.v4()
        rutina.id = rutinaId
        newEjercicios = ejercicios.slice().map( e => {
            return {ejercicioId: e.id, rutinaId: rutinaId}
        })
    }
    return ({...rutina ,ejercicios: newEjercicios})
}