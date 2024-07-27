import db from "../db/database"
import { Users, Rutina, Ejercicio, RutinaToEjercicio } from "@/db/schema"
import { eq } from "drizzle-orm"
import uuid from "react-native-uuid"

export async function getAllRutinas(){
    return await db.select().from(Rutina)
}

export async function addRutina(rutina){
    const rutinaId = uuid.v4()
    const ejercicios = rutina.ejercicios.map( e => ({ejercicioId: e.id, rutinaId: rutinaId}))
    await db.insert(Rutina).values({id: rutinaId, ...rutina})
    await db.insert(RutinaToEjercicio).values(ejercicios)
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