import db from "../db/database"
import { Users, Rutina, Ejercicio, RutinaToEjercicio } from "@/db/schema"
import { eq } from "drizzle-orm"
import uuid from "react-native-uuid"
import { EjercicioSeleccionado, Ejercicio as EjercicioType, RutinaType, RutinaToEjercicioType, RutinaWithEjerciciosType, RutinaWithRutinaToEjercicioType, EjercicioDropdownType } from "@/types/types"

export async function getAllRutinas(){
    return await db.select().from(Rutina)
}

export async function getRutinaWithEjercicios(id: any){
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
    if(!rutinaEjercicios){
        return
    }
    const ejercicios = rutinaEjercicios?.rutinaToEjercicio.map(e => e.ejercicio)
    const rutinaWithEjercicios: RutinaWithEjerciciosType = {id: rutinaEjercicios?.id, name: rutinaEjercicios?.name, ejercicios: ejercicios}
    return rutinaWithEjercicios
}

export async function addRutina(rutina: RutinaWithRutinaToEjercicioType){
    await db.insert(Rutina).values({id: rutina.id, name: rutina.name})
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function editRutina(rutina: RutinaWithRutinaToEjercicioType){
    await db.delete(RutinaToEjercicio).where(eq(RutinaToEjercicio.rutinaId, rutina.id))
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function deleteRutina(idRutina: unknown){
    return await db.delete(Rutina).where(eq(Rutina.id, idRutina)) 
}

export async function getAllEjercicios(){
    const ejercicios : EjercicioType[] = await db.select().from(Ejercicio)
    return ejercicios
}

export async function getAllEjerciciosForDropwdown() {
    let ejercicios = await getAllEjercicios()
    const ejerciciosDropdown = ejercicios.map( e => {
        const ejercicioDropdown : EjercicioDropdownType = {
            ...e,
            title: e.name,
            isSelected: false
        }
        return ejercicioDropdown
    })
    return ejerciciosDropdown
}

export function prepareDataForModifyRutinaComponent(rutinaWithEjercicios: RutinaWithEjerciciosType, ejerciciosDropdown: EjercicioDropdownType[]){
    const newEjerciciosSeleccionados: EjercicioSeleccionado[] = rutinaWithEjercicios.ejercicios.map(e => {
        return {...e, key: e.id}
    })
    newEjerciciosSeleccionados.forEach(es =>{
        const index = ejerciciosDropdown.findIndex(e => e.id === es.id)
        ejerciciosDropdown[index].isSelected = true
    })

    return {ejerciciosSeleccionados: newEjerciciosSeleccionados, ejerciciosDropdown: ejerciciosDropdown}
}

export function prepareDataForSaveRutina(rutina: RutinaType, ejercicios: EjercicioType[]): RutinaWithRutinaToEjercicioType{
    let newEjercicios: RutinaToEjercicioType[]
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