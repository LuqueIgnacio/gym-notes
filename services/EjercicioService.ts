import db from "../db/database"
import { Ejercicio } from "@/db/schema"

export async function addEjercicio(){
    await db.insert(Ejercicio).values([{name: "Press Banca"}, {name: "Press Militar"}, {name: "Dominadas"}, {name: "Fondos"}, {name: "Remo"}, {name: "Estocadas"},
    {name: "Hip Thrust"}, {name: "Prensa"}
    ])
}

export async function getAllEjercicios(){
    return await db.select().from(Ejercicio)
}