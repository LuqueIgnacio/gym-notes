import db from "../db/database"
import { Users, Rutina, Ejercicio } from "@/db/schema"

export async function getAllRutinas(){
    return await db.select().from(Users)
}

export async function addRutina(){
    await db.insert(Ejercicio).values([
        { id: 1, name: "Press Banca"},
        { id: 2, name: "Press Militar"},
        { id: 3, name: "Fondos" },
        { id: 4, name: "Dominadas" },
        { id: 5, name: "Peso Muerto" },
        { id: 6, name: "Sentadillas" },
      ])
    return await db.insert(Users).values({id: 1, name: 2})
}

export async function deleteRutina(){
    return await db.delete(Users)
}

export async function getAllEjercicios(){
    return await db.select().from(Ejercicio)
}